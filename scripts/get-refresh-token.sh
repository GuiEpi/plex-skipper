#!/bin/bash

# Script to obtain a new Refresh Token for Chrome Web Store

echo "🔑 Chrome Web Store - Refresh Token Generator"
echo "=============================================="
echo ""

# Check if arguments are provided
if [ $# -eq 0 ]; then
    echo "📝 Enter your Google Cloud information:"
    echo ""
    read -p "Client ID: " CLIENT_ID
    read -p "Client Secret: " CLIENT_SECRET
    read -p "Authorization Code (leave empty if you don't have one yet): " AUTH_CODE
else
    CLIENT_ID=$1
    CLIENT_SECRET=$2
    AUTH_CODE=$3
fi

echo ""

# If no authorization code, display instructions
if [ -z "$AUTH_CODE" ]; then
    echo "📋 STEP 1: Get the authorization code"
    echo "======================================="
    echo ""
    echo "1. Open this URL in your browser:"
    echo ""
    echo "https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=${CLIENT_ID}&redirect_uri=http://localhost&access_type=offline&prompt=consent"
    echo ""
    echo "2. Accept the permissions"
    echo "3. You will be redirected to an error page (this is normal!)"
    echo "4. Copy the CODE from the URL (between 'code=' and '&scope')"
    echo ""
    read -p "Paste the authorization code here: " AUTH_CODE
    echo ""
fi

# Exchange the code for a refresh token
echo "⏳ Exchanging code for refresh token..."
echo ""

RESPONSE=$(curl -s -X POST https://oauth2.googleapis.com/token \
  -d "client_id=${CLIENT_ID}" \
  -d "client_secret=${CLIENT_SECRET}" \
  -d "code=${AUTH_CODE}" \
  -d "grant_type=authorization_code" \
  -d "redirect_uri=http://localhost")

# Check if the request succeeded
if echo "$RESPONSE" | grep -q "error"; then
    echo "❌ Error getting refresh token:"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
    echo ""
    echo "💡 Possible causes:"
    echo "   - The authorization code is invalid or already used"
    echo "   - The Client ID or Client Secret is incorrect"
    echo "   - The redirect_uri doesn't match (must be http://localhost)"
    echo ""
    echo "🔄 Restart the process with a new authorization code"
    exit 1
fi

# Extract the refresh token
REFRESH_TOKEN=$(echo "$RESPONSE" | grep -o '"refresh_token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$REFRESH_TOKEN" ]; then
    echo "⚠️  No refresh token received. Full response:"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
    echo ""
    echo "💡 Note: If you only see an access_token without refresh_token,"
    echo "   make sure the URL includes 'access_type=offline&prompt=consent'"
    exit 1
fi

# Display results
echo "✅ Refresh Token obtained successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 SECRETS TO ADD IN GITHUB:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "CLIENT_ID:"
echo "$CLIENT_ID"
echo ""
echo "CLIENT_SECRET:"
echo "$CLIENT_SECRET"
echo ""
echo "REFRESH_TOKEN:"
echo "$REFRESH_TOKEN"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 To update in GitHub:"
echo "   1. Go to Settings → Secrets and variables → Actions"
echo "   2. Update the REFRESH_TOKEN secret with the value above"
echo ""
echo "✨ Done!"
