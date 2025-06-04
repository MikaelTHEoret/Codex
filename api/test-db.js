// 🚀 FIXED - Astra DB Connection Test for Autonomous Galaxy
// Corrected for Vercel deployment with CommonJS

const { DataAPIClient } = require('@datastax/astra-db-ts');

module.exports = async function handler(req, res) {
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
        // ✅ CORRECTED CLIENT INITIALIZATION
        const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);
        const db = client.db(process.env.ASTRA_DB_API_ENDPOINT);
        
        // Test connection with timeout
        console.log('🔍 Testing Astra DB connection...');
        const collections = await Promise.race([
          db.listCollections(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Connection timeout after 10s')), 10000)
          )
        ]);
        
        // Test fractal_nodes collection specifically
        let fractalNodesCount = 0;
        try {
          const fractalCollection = db.collection('fractal_nodes');
          fractalNodesCount = await fractalCollection.estimatedDocumentCount();
        } catch (collectionError) {
          console.log('Note: fractal_nodes collection not found - will be created on first use');
        }
        
        return res.status(200).json({
          success: true,
          message: "✅ Autonomous Knowledge Galaxy API Online!",
          ...dbStatus,
          astra_status: {
            connection: "✅ Connected",
            collections: collections,
            fractal_nodes_count: fractalNodesCount,
            client_type: "DataAPIClient"
          },
          endpoints: {
            test: "/api/test-db",
            galaxy_nodes: "/api/galaxy-nodes",
            auto_place: "/api/auto-place"
          },
          galaxy_status: "🌌 Ready for autonomous knowledge clustering",
          autonomous_features: [
            "🧲 Gravitational positioning active",
            "🌀 Semantic similarity clustering",
            "⚡ Real-time synchronization",
            "🔄 Auto-positioning algorithms"
          ]
        });

      } catch (dbError) {
        console.error('❌ Astra DB Error:', dbError);
        return res.status(500).json({
          success: false,
          message: "❌ Astra DB connection failed",
          ...dbStatus,
          error: dbError.message,
          debug_info: {
            error_type: dbError.constructor.name,
            stack_trace: dbError.stack?.split('\n')[0] // First line only
          },
          troubleshooting: [
            "🔧 Verify ASTRA_DB_APPLICATION_TOKEN is correct",
            "🔧 Verify ASTRA_DB_API_ENDPOINT format", 
            "🔧 Check if database is active in Astra console",
            "🔧 Ensure database region matches endpoint URL"
          ]
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "❌ Missing Astra DB credentials",
        ...dbStatus,
        required_env_vars: [
          "ASTRA_DB_APPLICATION_TOKEN",
          "ASTRA_DB_API_ENDPOINT"
        ],
        setup_instructions: [
          "1. Add environment variables in Vercel dashboard",
          "2. Format: ASTRA_DB_APPLICATION_TOKEN=AstraCS:...",
          "3. Format: ASTRA_DB_API_ENDPOINT=https://DATABASE_ID-REGION.apps.astra.datastax.com"
        ]
      });
    }

  } catch (error) {
    console.error('❌ Unexpected API error:', error);
    return res.status(500).json({
      success: false,
      message: "❌ Unexpected error occurred",
      error: error.message,
      timestamp: new Date().toISOString(),
      debug_info: {
        error_type: error.constructor.name
      }
    });
  }
};