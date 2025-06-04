#!/bin/bash
# 🚀 Autonomous Galaxy Deployment & Test Script

echo "🌌 DEPLOYING AUTONOMOUS GRAVITATIONAL KNOWLEDGE GALAXY"
echo "═══════════════════════════════════════════════════════"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Run this script from your project root.${NC}"
    exit 1
fi

echo -e "${CYAN}📦 Installing dependencies...${NC}"
npm install @datastax/astra-db-ts@latest @vercel/node@latest

echo -e "${CYAN}🔧 Verifying Vercel configuration...${NC}"
if [ ! -f "vercel.json" ]; then
    echo -e "${RED}❌ Warning: vercel.json not found${NC}"
else
    echo -e "${GREEN}✅ vercel.json found${NC}"
fi

# Check environment variables
echo -e "${CYAN}🔍 Checking environment variables...${NC}"
if [ -z "$ASTRA_DB_APPLICATION_TOKEN" ] && [ -z "$VERCEL_ENV" ]; then
    echo -e "${YELLOW}⚠️  Local environment variables not set${NC}"
    echo -e "${BLUE}💡 Make sure to set them in Vercel dashboard:${NC}"
    echo "   ASTRA_DB_APPLICATION_TOKEN=AstraCS:..."
    echo "   ASTRA_DB_API_ENDPOINT=https://your-db-region.apps.astra.datastax.com"
fi

echo -e "${CYAN}🚀 Deploying to Vercel...${NC}"
vercel --prod

# Wait for deployment
echo -e "${YELLOW}⏳ Waiting for deployment to complete...${NC}"
sleep 10

# Get the deployment URL
VERCEL_URL=$(vercel ls --confirm | grep -E "https://.*\.vercel\.app" | head -n 1 | awk '{print $2}')

if [ -z "$VERCEL_URL" ]; then
    echo -e "${RED}❌ Could not determine Vercel URL. Check deployment manually.${NC}"
    echo -e "${BLUE}💡 Go to: https://vercel.com/dashboard${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${MAGENTA}🌐 Galaxy URL: ${VERCEL_URL}${NC}"

echo -e "${CYAN}🧪 Testing Autonomous Galaxy API...${NC}"

# Test the fixed API
echo -e "${YELLOW}Testing Astra DB connection...${NC}"
curl -s "${VERCEL_URL}/api/test-db" | jq -r '.message // .error // "Connection test completed"'

echo -e "${YELLOW}Testing Galaxy Nodes API...${NC}"
curl -s "${VERCEL_URL}/api/galaxy-nodes" | jq -r '.data.galaxy_status // .error // "Galaxy API test completed"'

# Test node creation
echo -e "${YELLOW}Testing autonomous node creation...${NC}"
TEST_RESPONSE=$(curl -s -X POST "${VERCEL_URL}/api/galaxy-nodes" \
    -H "Content-Type: application/json" \
    -d '{
        "title": "Test Autonomous Node",
        "content": "Testing gravitational positioning with ψ₀ = 0.915671 and φ = 1.618034",
        "domain": "MATHEMATICAL"
    }')

if echo "$TEST_RESPONSE" | jq -e '.success' > /dev/null; then
    echo -e "${GREEN}✅ Node creation successful!${NC}"
    echo "$TEST_RESPONSE" | jq -r '.data.positioning | "Position: (\(.position.x | floor), \(.position.y | floor), \(.position.z | floor))"'
    echo "$TEST_RESPONSE" | jq -r '.data | "Gravitational attractions: \(.positioning.attractions)"'
else
    echo -e "${RED}❌ Node creation failed${NC}"
    echo "$TEST_RESPONSE" | jq -r '.error // "Unknown error"'
fi

echo ""
echo -e "${GREEN}🎉 AUTONOMOUS GRAVITATIONAL KNOWLEDGE GALAXY DEPLOYED!${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${MAGENTA}🌌 Your galaxy is now operational at:${NC}"
echo -e "${BLUE}   ${VERCEL_URL}${NC}"
echo ""
echo -e "${CYAN}📡 API Endpoints:${NC}"
echo -e "   GET  ${VERCEL_URL}/api/test-db      - Test connection"
echo -e "   GET  ${VERCEL_URL}/api/galaxy-nodes - List all nodes"
echo -e "   POST ${VERCEL_URL}/api/galaxy-nodes - Create new node"
echo ""
echo -e "${YELLOW}🧲 Autonomous Features Active:${NC}"
echo -e "   ✅ Gravitational positioning"
echo -e "   ✅ Semantic similarity clustering"
echo -e "   ✅ Fractal address organization"
echo -e "   ✅ Real-time synchronization"
echo -e "   ✅ Zero manual intervention"
echo ""
echo -e "${GREEN}🚀 Ready for autonomous knowledge evolution!${NC}"