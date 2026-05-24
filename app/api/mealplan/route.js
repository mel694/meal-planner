import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  try {
    const { adults, children, likes, dislikes, dietary, cookingTime, budget, swapDay, currentPlan } = await request.json();
    const dietaryText = dietary && dietary.length > 0 ? dietary.join(", ") : "none";
    const servings = parseInt(adults) + parseInt(children);

    let prompt;

    if (swapDay && currentPlan) {
      prompt = `The user wants to swap the meal on ${swapDay}. Here is their current meal plan:

${currentPlan}

Please suggest a completely different meal for ${swapDay} only. It must be different from all other meals in the plan above.
Family likes: ${likes}. Dislikes: ${dislikes}. Dietary: ${dietaryText}. Max cooking time: ${cookingTime}. Budget: ${budget}. Servings: ${servings}.

Return ONLY the replacement content for ${swapDay} using the same format as the other days, starting with ## ${swapDay} and including the meal details, macros and ingredients. Do not include any other days or the shopping list.`;
    } else {
      prompt = `Create a 7-day evening meal plan for a family of ${adults} adult(s) and ${children} child(ren) (${servings} people total).

Family likes: ${likes}
Family dislikes: ${dislikes}
Dietary requirements: ${dietaryText}
Budget: ${budget}
Maximum cooking time per meal: ${cookingTime}

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

Include every ingredient from all 7 meals. Replace spaces with + in URLs. Do not skip any category.`;
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
