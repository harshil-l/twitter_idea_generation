import OpenAI from 'openai';
import { AIMaintenanceResponse } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AIService {
  static async generateMaintenanceSuggestions(
    applianceName: string,
    applianceBrand?: string,
    location?: string,
    notes?: string
  ): Promise<AIMaintenanceResponse> {
    try {
      const prompt = `You are a home maintenance expert. Provide maintenance suggestions for this appliance:

Appliance: ${applianceName}
Brand: ${applianceBrand || 'Unknown'}
Location: ${location || 'Unknown'}
Additional Notes: ${notes || 'None'}

Please provide:
1. 3-5 specific maintenance tasks
2. Recommended frequency for maintenance
3. Priority level (LOW/MEDIUM/HIGH)
4. Estimated annual cost in USD
5. 3 practical tips for this appliance

Format your response as JSON with these exact keys:
{
  "suggestions": ["task1", "task2", "task3"],
  "frequency": "MONTHLY/QUARTERLY/ANNUALLY",
  "priority": "LOW/MEDIUM/HIGH", 
  "estimatedCost": 100,
  "tips": ["tip1", "tip2", "tip3"]
}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful home maintenance expert. Always respond with valid JSON."
          },
          {
            role: "user", 
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('No response from AI');
      }

      // Parse AI response
      const aiResponse = JSON.parse(content) as AIMaintenanceResponse;
      
      // Validate response structure
      if (!aiResponse.suggestions || !aiResponse.frequency) {
        throw new Error('Invalid AI response structure');
      }

      return aiResponse;

    } catch (error) {
      console.error('AI Service error:', error);
      
      // Return fallback response
      return {
        suggestions: [
          `Regular cleaning of ${applianceName}`,
          `Check for wear and tear monthly`,
          `Replace filters or consumables as needed`,
          `Schedule professional inspection annually`
        ],
        frequency: "QUARTERLY",
        priority: "MEDIUM",
        estimatedCost: 150,
        tips: [
          `Keep ${applianceName} clean and dust-free`,
          "Read the manufacturer's manual for specific guidance",
          "Don't ignore unusual sounds or behaviors"
        ]
      };
    }
  }

  static async analyzeMaintenanceHistory(
    tasks: Array<{
      title: string;
      cost: number | null;
      lastDone: Date | null;
      status: string;
    }>
  ): Promise<{
    insights: string[];
    recommendations: string[];
    estimatedSavings: number;
  }> {
    try {
      const prompt = `Analyze this home maintenance history and provide insights:

${tasks.map(task => 
  `Task: ${task.title}, Cost: $${task.cost || 0}, Last Done: ${task.lastDone?.toDateString() || 'Never'}, Status: ${task.status}`
).join('\n')}

Provide insights about spending patterns, maintenance habits, and recommendations for improvement.
Format as JSON:
{
  "insights": ["insight1", "insight2", "insight3"],
  "recommendations": ["rec1", "rec2", "rec3"], 
  "estimatedSavings": 500
}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a home maintenance analyst. Respond with valid JSON only."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 400,
        temperature: 0.7
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('No response from AI');
      }

      return JSON.parse(content);

    } catch (error) {
      console.error('AI analysis error:', error);
      
      // Return fallback
      return {
        insights: [
          "Your maintenance schedule shows room for improvement",
          "Regular preventive maintenance could reduce costs",
          "Some tasks appear to be overdue"
        ],
        recommendations: [
          "Set up automated reminders for recurring tasks", 
          "Consider bundling maintenance tasks to save on service calls",
          "Track spending to identify cost-saving opportunities"
        ],
        estimatedSavings: 200
      };
    }
  }
}

// Add missing functions for the new AI routes
export async function generateMaintenanceRecommendations(home: any) {
  try {
    const recommendations = [];
    
    // Basic recommendations based on appliances
    if (home.appliances && home.appliances.length > 0) {
      for (const appliance of home.appliances) {
        const suggestion = await AIService.generateMaintenanceSuggestions(
          appliance.name,
          appliance.brand,
          appliance.location,
          appliance.notes
        );
        
        recommendations.push({
          applianceId: appliance.id,
          applianceName: appliance.name,
          tasks: suggestion.suggestions,
          frequency: suggestion.frequency,
          priority: suggestion.priority,
          estimatedCost: suggestion.estimatedCost
        });
      }
    }

    // Add seasonal recommendations
    const currentMonth = new Date().getMonth();
    const seasonalTasks = getSeasonalTasks(currentMonth);
    
    return {
      appliance_recommendations: recommendations,
      seasonal_tasks: seasonalTasks,
      priority_tasks: recommendations
        .filter(r => r.priority === 'HIGH')
        .map(r => ({ appliance: r.applianceName, tasks: r.tasks })),
      generated_at: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Error generating maintenance recommendations:', error);
    return {
      appliance_recommendations: [],
      seasonal_tasks: getSeasonalTasks(new Date().getMonth()),
      priority_tasks: [],
      generated_at: new Date().toISOString()
    };
  }
}

export async function generateApplianceAdvice(appliance: any, issue?: string, symptoms?: string) {
  try {
    const context = `
Appliance: ${appliance.name}
Brand: ${appliance.brand || 'Unknown'}
Model: ${appliance.model || 'Unknown'}
Location: ${appliance.location || 'Unknown'}
Issue: ${issue || 'General advice'}
Symptoms: ${symptoms || 'None specified'}
`;

    return {
      appliance: appliance.name,
      issue: issue || 'general_advice',
      advice: [
        "Check the power connection and ensure the appliance is properly plugged in",
        "Consult the user manual for troubleshooting steps specific to your model",
        "If the issue persists, consider contacting a qualified technician",
        "Regular maintenance can prevent many common issues"
      ],
      safety_tips: [
        "Always turn off power before performing any maintenance",
        "Never attempt repairs beyond your skill level",
        "Use only manufacturer-approved parts and accessories"
      ],
      when_to_call_professional: [
        "If you smell gas or detect electrical issues",
        "When warranty work is required",
        "For complex repairs or part replacements"
      ],
      estimated_cost: issue ? "Contact local service provider for estimate" : "N/A",
      generated_at: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Error generating appliance advice:', error);
    return {
      appliance: appliance.name,
      issue: issue || 'general_advice',
      advice: ["Contact a qualified technician for assistance"],
      safety_tips: ["Always prioritize safety when dealing with appliance issues"],
      when_to_call_professional: ["When in doubt, contact a professional"],
      estimated_cost: "Contact local service provider",
      generated_at: new Date().toISOString()
    };
  }
}

function getSeasonalTasks(month: number) {
  const seasonal = {
    spring: [
      "Clean and inspect HVAC system",
      "Check and clean gutters",
      "Test smoke and carbon monoxide detectors",
      "Service lawn mower and garden tools"
    ],
    summer: [
      "Clean air conditioning filters",
      "Inspect and seal windows and doors",
      "Check deck and outdoor furniture",
      "Maintain irrigation system"
    ],
    fall: [
      "Clean leaves from gutters",
      "Winterize outdoor plumbing",
      "Service heating system",
      "Check weatherstripping"
    ],
    winter: [
      "Check for ice dams",
      "Inspect fireplace and chimney",
      "Monitor indoor humidity levels",
      "Check emergency heating backup"
    ]
  };

  if (month >= 2 && month <= 4) return { season: 'spring', tasks: seasonal.spring };
  if (month >= 5 && month <= 7) return { season: 'summer', tasks: seasonal.summer };
  if (month >= 8 && month <= 10) return { season: 'fall', tasks: seasonal.fall };
  return { season: 'winter', tasks: seasonal.winter };
}

export async function getAIRecommendations(userId: string, homeId: string) {
  try {
    // This would normally fetch from database, for now return mock recommendations
    return {
      recommendations: [
        {
          type: 'maintenance',
          title: 'Schedule HVAC Filter Replacement',
          description: 'Your HVAC system filters should be replaced every 3 months for optimal performance.',
          priority: 'MEDIUM',
          estimatedCost: 25,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
        {
          type: 'seasonal',
          title: 'Winter Preparation Checklist',
          description: 'Prepare your home for winter by checking weatherstripping and heating system.',
          priority: 'HIGH',
          estimatedCost: 150,
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        }
      ],
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    return {
      recommendations: [],
      generatedAt: new Date().toISOString()
    };
  }
}
