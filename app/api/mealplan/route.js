import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  try {
    const body = await request.json();
    const { adults, children, likes, dislikes, dietary, cookingTime, budget, swapDay, currentPlan, fridgePhotos, action } = body;

    if (action === "analyse_fridge" && fridgePhotos && fridgePhotos.length > 0) {
      const content = [
        ...fridgePhotos.map((photo) => ({
          type: "image",
          source: {
            type: "base64",
            media_type: photo.mediaType || "image/jpeg",
            data: photo.data,
          },
        })),
        {
          type: "text",
          text: `Look carefully at these photos of a fridge and/or kitchen cupboards. List EVERY ingredient or food item you can clearly see in the photos.

Return ONLY a simple comma-separated list of ingredients in lowercase. For example: eggs, butter, milk, cheddar, onions, garlic, chicken thighs, pasta, tomatoes, lettuce.

Do not include packaging or branded items. Just the raw ingredients. Do not add any other text, explanation or formatting.`,
        },
      ];

      const message = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content }],
      });

      const ingredients = message.content[0].text.trim();
      return Response.json({ ingredients });
    }

    const dietaryText = dietary && dietary.length > 0 ? dietary.join(", ") : "none";
    const servings = parseInt(adults) + parseInt(children);
    const alreadyHave = body.alreadyHave || "";

    let prompt;

    if (swapDay && currentPlan) {
      prompt = `The user wants to swap the meal on ${swapDay}. Here is their current meal plan:

${currentPlan}

Please suggest a completely different meal for ${swapDay} only. It must be different from all other meals in the plan above.
Family likes: ${likes}. Dislikes: ${dislikes}. Dietary: ${dietaryText}. Max cooking time: ${cookingTime}. Budget: ${budget}. Servings: ${servings}.

Return ONLY the replacement content for ${swapDay} using the same format as the other days, starting with ## ${swapDay} and including the meal details, macros and ingredients. Do not include any other days or the shopping list.`;
    } else {
      const alreadyHaveSection = alreadyHave
        ? `\n\nINGREDIENTS THE FAMILY ALREADY HAS (from fridge/cupboard photos):\n${alreadyHave}\n\nIMPORTANT: When generating the shopping list, DO NOT include these ingredients. The family already has them. You can still use them in recipes, but exclude them from the shopping list entirely.`
        : "";

      prompt = `Create a 7-day evening meal plan for a family of ${adults} adult(s) and ${children} child(ren) (${servings} people total).

Family likes: ${likes}
Family dislikes: ${dislikes}
Dietary requirements: ${dietaryText}
Budget: ${budget}
Maximum cooking time per meal: ${cookingTime}${alreadyHaveSection}

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

Repeat for Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.

After all 7 days you MUST include a shopping list using EXACTLY this format:

## SHOPPING LIST
**Meat & Fish**
- Chicken thighs (800g) | Sainsburys: https://www.sainsburys.co.uk/gol-ui/SearchResults/chicken+thighs | Ocado: https://www.ocado.com/search?entry=chicken+thighs
**Fruit & Veg**
- Carrots (500g) | Sainsburys: https://www.sainsburys.co.uk/gol-ui/SearchResults/carrots | Ocado: https://www.ocado.com/search?entry=carrots
**Dairy & Eggs**
**Tins & Pantry**
**Bakery**
**Other**

Include every ingredient from all 7 meals EXCEPT those already in the fridge/cupboard. Replace spaces with + in URLs. Do not skip any category.`;
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
