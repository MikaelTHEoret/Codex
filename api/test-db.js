// Test Astra DB connection with CommonJS fallback

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
        // Try different import methods for Vercel compatibility
        let Client;
        try {
          // Method 1: Named import
          const { Client: NamedClient } = await import('@datastax/astra-db-ts');
          Client = NamedClient;
        } catch (e1) {
          try {
            // Method 2: Default import
            const defaultImport = await import('@datastax/astra-db-ts');
            Client = defaultImport.default;
          } catch (e2) {
            try {
              // Method 3: Namespace import
              const namespaceImport = await import('@datastax/astra-db-ts');
              Client = namespaceImport.Client;
            } catch (e3) {
              throw new Error(`All import methods failed: ${e1.message}, ${e2.message}, ${e3.message}`);
            }
          }
        }
        
        if (!Client || typeof Client !== 'function') {
          throw new Error(`Client import failed - got: ${typeof Client}`);
        }
        
        // Test connection
        const client = new Client(process.env.ASTRA_DB_APPLICATION_TOKEN);
        const db = client.db(process.env.ASTRA_DB_API_ENDPOINT);
        
        // Test basic operation with shorter timeout
        const collections = await Promise.race([
          db.listCollections(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Connection timeout after 5s')), 5000)
          )
        ]);
        
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
        return res.status(200).json({
          success: false,
          message: "⚠️ Database connection failed - operating in memory mode",
          ...dbStatus,
          error: dbError.message,
          memory_mode: {
            status: "✅ Active",
            description: "Autonomous positioning works without database",
            capabilities: [
              "🧲 Gravitational positioning functional",
              "⚡ Real-time calculations active",
              "🌌 Frontend integration ready"
            ]
          },
          troubleshooting: [
            "🔧 Database optional - system works in memory mode",
            "🔧 Gravitational mechanics independent of storage",
            "🔧 Can add persistence later if needed"
          ]
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "⚠️ Astra DB credentials not configured - memory mode active",
        ...dbStatus,
        memory_mode: {
          status: "✅ Available",
          description: "System fully functional without database persistence"
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