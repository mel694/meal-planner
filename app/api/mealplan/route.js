import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const GOAL_PROMPTS = {
  balanced: "",
  highprotein: "IMPORTANT: Every meal MUST be high in protein (at least 35g per serving). Prioritise chicken, turkey, fish, eggs, Greek yogurt, legumes and lean meats. Include protein content prominently in each meal.",
  fatloss: "IMPORTANT: Every meal MUST be low calorie (under 500 calories per serving) and high in fibre and protein to keep the family full. Avoid heavy carbs, fried foods and creamy sauces. Focus on vegetables, lean proteins and whole grains.",
  quick: "IMPORTANT: Every meal MUST take 20 minutes or less from start to finish. No exceptions. Prioritise stir-fries, quick pasta dishes, omelettes, wraps and simple grilled proteins.",
  toddler: "IMPORTANT: These meals MUST be suitable for babies and toddlers (6 months to 3 years). No added salt, no honey, no whole nuts, no shellfish. Soft textures, mild flavours, easy to eat with hands or a spoon. Include finger food options where possible.",
  plantbased: "IMPORTANT: Every meal MUST be plant-forward — primarily vegetables, legumes, grains, nuts and seeds. Meat is allowed occasionally but vegetables should be the star. Prioritise colourful, nutrient-dense plant ingredients.",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { adults, children, likes, dislikes, dietary, cookingTime, budget, swapDay, currentPlan, fridgePhotos, action, swapStyle, swapProtein, mealGoal, ingredients } = body;

    // Action: analyse fridge photos
    if (action === "analyse_fridge" && fridgePhotos && fridgePhotos.length > 0) {
      const content = [
        ...fridgePhotos.map((photo) => ({
          type: "image",
          source: { type: "base64", media_type: photo.mediaType || "image/jpeg", data: photo.data },
        })),
        {
          type: "text",
          text: `Look carefully at these photos of a fridge and/or kitchen cupboards. List EVERY ingredient or food item you can clearly see.

Return ONLY a simple comma-separated list of ingredients in lowercase. For example: eggs, butter, milk, cheddar, onions, garlic, chicken thighs, pasta, tomatoes, lettuce.

Do not include packaging or branded items. Just the raw ingredients. No other text or formatting.`,
        },
      ];
      const message = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content }],
      });
      return Response.json({ ingredients: message.content[0].text.trim() });
    }

    // Action: generate a single recipe from fridge ingredients
    if (action === "fridge_recipe" && ingredients) {
      const servings = parseInt(adults || 2) + parseInt(children || 2);
      const prompt = `You are a creative chef. Using ONLY these ingredients (or a selection of them), create ONE delicious dinner recipe for ${servings} people:

${ingredients}

You may also assume the family has basic pantry staples: salt, pepper, olive oil, butter, garlic, onion, and common dried herbs and spices.

Return the recipe in this format:

## [Recipe Name]
[Cuisine] | [Cooking time] | [Difficulty]
[2 sentence description]
Calories: Xcal | Protein: Xg | Carbs: Xg | Fat: Xg

**Ingredients**
- ingredient (amount)

**Method**
1. Step one
2. Step two

Keep it practical and delicious. Only use what's available.`;

      const message = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      });
      return Response.json({ recipe: message.content[0].text.trim() });
    }

    const dietaryText = dietary && dietary.length > 0 ? dietary.join(", ") : "none";
    const servings = parseInt(adults) + parseInt(children);
    const alreadyHave = body.alreadyHave || "";
    const goalInstruction = GOAL_PROMPTS[mealGoal] || "";
    const scheduledMeals = body.scheduledMeals || [];

    let prompt;

    // Action: swap a single meal
    if (swapDay && currentPlan) {
      const styleInstruction = swapStyle && swapStyle !== "any" ? `It MUST be a ${swapStyle} recipe.` : "";
      const proteinInstruction = swapProtein && swapProtein !== "any" ? `It MUST use ${swapProtein} as the main protein/ingredient.` : "";
      prompt = `The user wants to swap the meal on ${swapDay}. Here is their current meal plan:

${currentPlan}

Please suggest a completely different meal for ${swapDay} only. It must be different from all other meals above.
${styleInstruction} ${proteinInstruction} ${goalInstruction}
Family likes: ${likes}. Dislikes: ${dislikes}. Dietary: ${dietaryText}. Max cooking time: ${cookingTime}. Budget: ${budget}. Servings: ${servings}.

Return ONLY the replacement content for ${swapDay} using the same format, starting with ## ${swapDay}. Include meal details, macros and ingredients. Do not include other days or the shopping list.`;

    } else {
      // Action: generate full 7-day meal plan
      const alreadyHaveSection = alreadyHave
        ? `\n\nINGREDIENTS ALREADY IN THE FRIDGE/CUPBOARD:\n${alreadyHave}\n\nDo NOT include these in the shopping list. You can use them in recipes but exclude from the shopping list.`
        : "";

      const cookingStyleInstruction = body.cookingStyle && body.cookingStyle !== "any"
        ? `\nPreferred cooking style: ${body.cookingStyle}. Prioritise ${body.cookingStyle} recipes where possible.`
        : "";

      // Build scheduled meals section
      const scheduledDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
      let scheduledSection = "";
      if (scheduledMeals.length > 0) {
        scheduledSection = "\n\nPRE-SCHEDULED MEALS — use these exactly as provided for these days, do not change them:\n";
        scheduledMeals.forEach((sm) => {
          if (sm && sm.day && sm.content) {
            scheduledSection += `\n${sm.content}\n`;
          }
        });
        const scheduledDayNames = scheduledMeals.map(sm => sm.day);
        const remainingDays = scheduledDays.filter(d => !scheduledDayNames.includes(d));
        scheduledSection += `\nGenerate NEW meals for these remaining days only: ${remainingDays.join(", ")}.`;
      }

      prompt = `Create a 7-day evening meal plan for a family of ${adults} adult(s) and ${children} child(ren) (${servings} people total).

Family likes: ${likes}
Family dislikes: ${dislikes}
Dietary requirements: ${dietaryText}
Budget: ${budget}
Maximum cooking time per meal: ${cookingTime}${cookingStyleInstruction}
${goalInstruction}${alreadyHaveSection}${scheduledSection}

For each day use EXACTLY this format:
## Monday
Meal name | Cuisine | Time | Difficulty
Description of the meal in 2 sentences.
Calories: Xcal | Protein: Xg | Carbs: Xg | Fat: Xg
**Ingredients**
- ingredient (amount)
**Method**
1. Step one
2. Step two

Repeat for ALL 7 days — Monday through Sunday — in order. Include the pre-scheduled meals exactly as provided above for their days.

After all 7 days include a shopping list in EXACTLY this format:

## SHOPPING LIST
**Meat & Fish**
- Chicken thighs (800g) | Sainsburys: https://www.sainsburys.co.uk/gol-ui/SearchResults/chicken+thighs | Ocado: https://www.ocado.com/search?entry=chicken+thighs
**Fruit & Veg**
- Carrots (500g) | Sainsburys: https://www.sainsburys.co.uk/gol-ui/SearchResults/carrots | Ocado: https://www.ocado.com/search?entry=carrots
**Dairy & Eggs**
**Tins & Pantry**
**Bakery**
**Other**

Include every ingredient from all 7 meals EXCEPT those already in the fridge. Replace spaces with + in URLs. Do not skip any category.`;
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8000,
      messages: [{ role: "user", content: prompt }],
    });

    return Response.json({ mealPlan: message.content[0].text });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Failed to generate meal plan" }, { status: 500 });
  }
}
