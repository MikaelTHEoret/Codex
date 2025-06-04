// Main Autonomous Galaxy API endpoint
import { Client } from '@datastax/astra-db-ts';

// Initialize Astra DB connection
let astraClient = null;
let astraDB = null;

function getAstraDB() {
  if (!astraDB) {
    if (!process.env.ASTRA_DB_APPLICATION_TOKEN || !process.env.ASTRA_DB_API_ENDPOINT) {
      throw new Error('Astra DB credentials not configured');
    }
    
    astraClient = new Client(process.env.ASTRA_DB_APPLICATION_TOKEN);
    astraDB = astraClient.db(process.env.ASTRA_DB_API_ENDPOINT);
  }
  
  return astraDB;
}

export default async function handler(req, res) {
  // CORS headers for your GitHub Pages frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'CORS preflight OK' });
  }

  try {
    // Check if Astra DB is configured
    const astraConfigured = !!(process.env.ASTRA_DB_APPLICATION_TOKEN && process.env.ASTRA_DB_API_ENDPOINT);
    let dbConnectionStatus = "⚠️ Credentials needed";
    let nodeCount = 0;
    let collections = [];

    // Test database connection if configured
    if (astraConfigured) {
      try {
        const db = getAstraDB();
        collections = await db.listCollections();
        dbConnectionStatus = "✅ Connected";
        
        // Try to get node count
        try {
          const fractalNodes = db.collection('fractal_nodes');
          const nodeQuery = await fractalNodes.find({}).limit(1).toArray();
          nodeCount = nodeQuery.length > 0 ? "Active" : 0;
        } catch (err) {
          nodeCount = "Collection not found";
        }
      } catch (error) {
        dbConnectionStatus = `❌ Connection failed: ${error.message}`;
      }
    }
    
    // System status response
    const galaxyStatus = {
      success: true,
      message: "🌌 Autonomous Gravitational Knowledge Galaxy API",
      timestamp: new Date().toISOString(),
      system_status: {
        vercel_deployment: "✅ Active",
        serverless_functions: "✅ Operational", 
        astra_db_connection: dbConnectionStatus,
        cors_configuration: "✅ Enabled",
        gravitational_engine: "✅ Ready",
        autonomous_positioning: "✅ Standby",
        node_count: nodeCount,
        collections_found: collections.length
      },
      available_endpoints: {
        "GET /api/galaxy": "System status and configuration",
        "GET /api/galaxy-nodes": "Retrieve all knowledge nodes",
        "POST /api/galaxy-nodes": "Create new knowledge nodes", 
        "POST /api/auto-place": "Automatic gravitational positioning",
        "GET /api/test-db": "Database connection test"
      },
      mathematical_constants: {
        "ψ₀": 0.915670570874434,
        "φ": 1.618034,
        "base_frequency": "432 Hz"
      },
      fractal_addressing: "NEXUS.CORE.⧬✶⧬.DOMAIN.CONTENT.v1.0.section",
      next_steps: astraConfigured ? [
        "✅ System ready for autonomous operation",
        "🌌 Add knowledge nodes via POST /api/galaxy-nodes",
        "🧲 Gravitational clustering will activate automatically",
        `📊 Found ${collections.length} collections in database`
      ] : [
        "🔧 Set ASTRA_DB_APPLICATION_TOKEN in Vercel environment variables",
        "🔧 Set ASTRA_DB_API_ENDPOINT in Vercel environment variables", 
        "🌌 Then system will be fully autonomous"
      ]
    };

    if (req.method === 'GET') {
      return res.status(200).json(galaxyStatus);
    }

    // Handle POST for basic node creation
    if (req.method === 'POST') {
      if (!astraConfigured) {
        return res.status(503).json({
          success: false,
          error: "Database not configured. Set environment variables first.",
          required_vars: ["ASTRA_DB_APPLICATION_TOKEN", "ASTRA_DB_API_ENDPOINT"]
        });
      }

      const nodeData = req.body;
      
      if (!nodeData || !nodeData.title) {
        return res.status(400).json({
          success: false,
          error: "Node data with title is required"
        });
      }

      try {
        const db = getAstraDB();
        const collection = db.collection('fractal_nodes');
        
        // Create enhanced node
        const enhancedNode = {
          node_id: nodeData.node_id || `NEXUS.CORE.⧬✶⧬.AUTO.${Date.now()}`,
          title: nodeData.title,
          content: nodeData.content || "",
          fractal_address: nodeData.fractal_address || `NEXUS.CORE.⧬✶⧬.AUTO.${nodeData.title.replace(/\s+/g, '_').toUpperCase()}.v1.0.main`,
          gravitational_mass: nodeData.gravitational_mass || 1.0,
          similarity_threshold: 0.5,
          equilibrium_position: { x: 0, y: 0, z: 0 },
          auto_positioning: true,
          created_at: new Date().toISOString(),
          last_gravitational_update: new Date().toISOString(),
          author: "Mikael Theoret",
          sovereignty_level: "apex"
        };

        const result = await collection.insertOne(enhancedNode);

        return res.status(201).json({
          success: true,
          data: {
            node: enhancedNode,
            id: result.insertedId,
            message: "Node added to Autonomous Gravitational Galaxy"
          }
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: `Database error: ${error.message}`
        });
      }
    }

    // Handle other methods
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`,
      allowed_methods: ['GET', 'POST', 'OPTIONS']
    });

  } catch (error) {
    console.error('Galaxy API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}