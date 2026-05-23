import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  try {
    const { adults, children, likes, dislikes, dietary, cookingTime, budget } = await request.json();
    const dietaryText = dietary && dietary.length > 0 ? dietary.join(", ") : "none";

    const prompt = `Create a 7-day evening meal plan for a family of ${adults} adult(s) and ${children} child(ren).
Family likes: ${likes}
Family dislikes: ${dislikes}
Dietary requirements: ${dietaryText}
Budget: ${budget}
Maximum cooking time per meal: ${cookingTime}

For each day use this format:
## Monday
Meal name | Cuisine | Time | Difficulty
Description of the meal.
**Ingredients**
- ingredient (amount)
**Method**
1. Step one
2. Step two

Repeat for all 7 days.

After all 7 days you MUST include a shopping list using EXACTLY this format:

## SHOPPING LIST
**Meat & Fish**
- Chicken thighs (800g) | Sainsburys: https://www.sainsburys.co.uk/gol-ui/SearchResults/chicken+thighs | Ocado: https://www.ocado.com/search?entry=chicken+thighs
**Fruit & Veg**
- Carrots (500g) | Sainsburys: https://www.sainsburys.co.uk/gol-ui/SearchResults/carrots | Ocado: https://www.ocado.com/search?entry=carrots
**Dairy & Eggs**
**Tins & Pantry**
**Other**

Follow that exact format for every ingredient. Replace spaces with + in URLs.`;

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