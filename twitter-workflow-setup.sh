#!/bin/bash
# Twitter Workflow Setup Script
# Run this on your MacBook after DroidClaw is installed

echo "🚀 Setting up Twitter automation workflows..."

# Create workflows directory
mkdir -p examples/workflows

# Create Twitter posting workflow
cat > examples/workflows/twitter-saas-post.json << 'INNER_EOF'
{
  "name": "twitter-saas-post",
  "steps": [
    {
      "app": "com.twitter.android",
      "goal": "open Twitter app and find the compose tweet button"
    },
    {
      "goal": "tap the compose button to start a new tweet",
      "formData": {
        "content": "🚀 Just built NotionClone in 48 hours! Full-stack replica with real-time editing + collaboration. #day1ofkillingSaaS #buildinpublic #saas #nocode"
      }
    },
    {
      "goal": "type the tweet content in the text box"
    },
    {
      "goal": "post the tweet by tapping the Tweet button"
    }
  ]
}
INNER_EOF

# Create simple test workflow
cat > examples/workflows/twitter-test.json << 'INNER_EOF'
{
  "name": "twitter-test",
  "steps": [
    {
      "app": "com.twitter.android", 
      "goal": "open Twitter app"
    },
    {
      "goal": "navigate to the home timeline and scroll down once"
    }
  ]
}
INNER_EOF

echo "✅ Twitter workflows created!"
echo "📁 Files created:"
echo "  - examples/workflows/twitter-saas-post.json"
echo "  - examples/workflows/twitter-test.json"
echo ""
echo "🧪 Test with:"
echo "  bun run src/kernel.ts --workflow examples/workflows/twitter-test.json"
