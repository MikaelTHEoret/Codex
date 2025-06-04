// Test Astra DB connection

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'CORS OK' });
  }

  try {
    const dbStatus = {
      timestamp: new Date().toISOString(),
      environment_check: {
        astra_token: process.env.ASTRA_DB_APPLICATION_TOKEN ? "✅ Set" : "❌ Missing",
        astra_endpoint: process.env.ASTRA_DB_API_ENDPOINT ? "✅ Set" : "❌ Missing"
      }
    };

    // If credentials are available, test connection
    if (process.env.ASTRA_DB_APPLICATION_TOKEN && process.env.ASTRA_DB_API_ENDPOINT) {
      try {
        // Import Astra DB client
        const { Client } = await import('@datastax/astra-db-ts');
        
        // Test connection
        const client = new Client(process.env.ASTRA_DB_APPLICATION_TOKEN);
        const db = client.db(process.env.ASTRA_DB_API_ENDPOINT);
        
        // Test basic operation
        const collections = await db.listCollections();
        
        return res.status(200).json({
          success: true,
          message: "🗄️ Astra DB connection successful!",
          ...dbStatus,
          database_info: {
            connection_status: "✅ Connected",
            collections_found: collections.length,
            collections: collections.map(c => c.name),
            autonomous_galaxy_ready: true
          },
          next_steps: [
            "✅ Database connection verified",
            "🌌 Ready for autonomous knowledge storage",
            "🧲 Gravitational clustering will persist data"
          ]
        });

      } catch (dbError) {
        return res.status(500).json({
          success: false,
          message: "❌ Astra DB connection failed",
          ...dbStatus,
          error: dbError.message,
          troubleshooting: [
            "🔧 Verify ASTRA_DB_APPLICATION_TOKEN is correct",
            "🔧 Verify ASTRA_DB_API_ENDPOINT format",
            "🔧 Check if database is active in Astra console"
          ]
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "⚠️ Astra DB credentials not configured",
        ...dbStatus,
        setup_instructions: [
          "1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables",
          "2. Add ASTRA_DB_APPLICATION_TOKEN (from Astra console)",
          "3. Add ASTRA_DB_API_ENDPOINT (your database endpoint)",
          "4. Redeploy and test again"
        ],
        mock_mode: {
          status: "✅ Available",
          description: "API will work in memory mode without database persistence"
        }
      });
    }

  } catch (error) {
    console.error('Database test error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}