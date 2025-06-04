// 🌌 Autonomous Galaxy Nodes API - Complete Gravitational Knowledge Engine
// /api/galaxy-nodes.js - Full autonomous positioning system (CommonJS)

const { DataAPIClient } = require('@datastax/astra-db-ts');

// Mathematical & Physical Constants
const PSI0 = 0.915670570874434;  // Fractal Seed Constant
const PHI = 1.618034;             // Golden Ratio
const BASE_FREQ = 432.0;          // Base Harmonic Frequency
const G = 6.67430e-11 * 1e15;     // Scaled Gravitational Constant

// Initialize Astra DB connection
function getAstraDB() {
    const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);
    const db = client.db(process.env.ASTRA_DB_API_ENDPOINT);
    return db;
}

// CORS headers
function setCORSHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Main API handler
module.exports = async function handler(req, res) {
    setCORSHeaders(res);
    
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).json({ message: 'CORS OK' });
    }

    try {
        const db = getAstraDB();
        const collection = db.collection('fractal_nodes');

        switch (req.method) {
            case 'GET':
                return await handleGetNodes(collection, req, res);
            
            case 'POST':
                return await handleCreateNode(collection, req, res);
            
            case 'PUT':
                return await handleUpdateNode(collection, req, res);
            
            default:
                return res.status(405).json({ 
                    success: false, 
                    error: 'Method not allowed',
                    allowed_methods: ['GET', 'POST', 'PUT'],
                    autonomous_galaxy: '🌌 Ready for knowledge clustering'
                });
        }
    } catch (error) {
        console.error('❌ Galaxy API Error:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message,
            message: 'Autonomous galaxy API error',
            timestamp: new Date().toISOString()
        });
    }
};

// Get all nodes in the galaxy
async function handleGetNodes(collection, req, res) {
    try {
        console.log('🔍 Fetching galaxy nodes...');
        
        // Get all nodes with optional filtering
        const filter = req.query.domain ? { 'fractal_address': { $regex: req.query.domain } } : {};
        const cursor = collection.find(filter);
        const nodes = await cursor.toArray();
        
        // Calculate galaxy statistics
        const statistics = calculateGalaxyStatistics(nodes);
        
        console.log(`✅ Retrieved ${nodes.length} nodes from autonomous galaxy`);
        
        return res.status(200).json({
            success: true,
            data: {
                nodes: nodes,
                count: nodes.length,
                statistics: statistics,
                galaxy_status: '🌌 Autonomous clustering active',
                gravitational_field: '🧲 Active',
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('❌ Error fetching galaxy nodes:', error);
        return res.status(500).json({
            success: false,
            error: `Failed to fetch galaxy nodes: ${error.message}`
        });
    }
}

// Create new node with automatic gravitational positioning
async function handleCreateNode(collection, req, res) {
    try {
        const nodeData = req.body;
        console.log('🚀 Creating autonomous galaxy node:', nodeData.title);
        
        // Generate unique node ID and fractal address if not provided
        const nodeId = nodeData.node_id || generateNodeId(nodeData);
        const fractalAddress = nodeData.fractal_address || generateFractalAddress(nodeData);
        
        // Enhance node with gravitational fields
        const enhancedNode = {
            ...nodeData,
            node_id: nodeId,
            fractal_address: fractalAddress,
            gravitational_mass: nodeData.gravitational_mass || 1.0,
            similarity_threshold: nodeData.similarity_threshold || 0.5,
            equilibrium_position: { x: 0, y: 0, z: 0 }, // Will be calculated
            orbital_velocity: 0,
            orbital_radius: 0,
            attraction_vectors: [],
            similarity_cache: {},
            auto_positioning: true,
            created_at: new Date().toISOString(),
            last_gravitational_update: new Date().toISOString(),
            sovereignty_level: nodeData.sovereignty_level || 'active'
        };
        
        // 🧲 AUTO-POSITION using gravitational mechanics
        const positionedNode = await performAutoPositioning(collection, enhancedNode);
        
        // Insert into autonomous galaxy
        const result = await collection.insertOne(positionedNode);
        console.log('✅ Node autonomously positioned and stored:', result.insertedId);
        
        return res.status(200).json({
            success: true,
            data: {
                node: positionedNode,
                id: result.insertedId,
                message: '🌟 Node autonomously positioned using gravitational mechanics',
                positioning: {
                    method: 'autonomous_gravitational',
                    position: positionedNode.equilibrium_position,
                    orbital_radius: positionedNode.orbital_radius,
                    attractions: positionedNode.gravitational_attractions || 0
                }
            }
        });
    } catch (error) {
        console.error('❌ Error creating autonomous node:', error);
        return res.status(500).json({
            success: false,
            error: `Failed to create autonomous node: ${error.message}`
        });
    }
}

// Update existing node
async function handleUpdateNode(collection, req, res) {
    try {
        const nodeId = req.query.nodeId || req.body.node_id;
        const updateData = req.body;
        
        console.log('🔄 Updating galaxy node:', nodeId);
        
        updateData.last_gravitational_update = new Date().toISOString();
        
        // If content changed, recalculate position
        if (updateData.content || updateData.title) {
            updateData.requires_repositioning = true;
        }
        
        const result = await collection.updateOne(
            { node_id: nodeId },
            { $set: updateData }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'Node not found in autonomous galaxy'
            });
        }
        
        console.log('✅ Galaxy node updated successfully');
        
        return res.status(200).json({
            success: true,
            data: {
                message: 'Node updated - gravitational field will recalculate',
                nodes_affected: result.modifiedCount,
                autonomous_status: '🧲 Gravitational rebalancing queued'
            }
        });
    } catch (error) {
        console.error('❌ Error updating galaxy node:', error);
        return res.status(500).json({
            success: false,
            error: `Failed to update galaxy node: ${error.message}`
        });
    }
}

// 🧲 AUTONOMOUS GRAVITATIONAL POSITIONING SYSTEM

async function performAutoPositioning(collection, node) {
    console.log(`🧲 Auto-positioning: ${node.title}`);
    
    try {
        // 1. Calculate base position from fractal address
        const basePosition = parseFractalAddress(node.fractal_address);
        
        // 2. Get existing nodes for gravitational calculation
        const cursor = collection.find({});
        const existingNodes = await cursor.toArray();
        
        console.log(`🔍 Analyzing gravitational field with ${existingNodes.length} existing nodes`);
        
        // 3. Calculate gravitational influences
        let totalForce = { x: 0, y: 0, z: 0 };
        let attractionCount = 0;
        
        for (const existingNode of existingNodes) {
            if (existingNode.node_id === node.node_id) continue;
            
            const similarity = await calculateSemanticSimilarity(node, existingNode);
            
            if (similarity > (node.similarity_threshold || 0.5)) {
                const force = calculateGravitationalForce(
                    { ...node, equilibrium_position: basePosition },
                    existingNode,
                    similarity
                );
                
                totalForce.x += force.x;
                totalForce.y += force.y;
                totalForce.z += force.z;
                attractionCount++;
                
                console.log(`🧲 Gravitational attraction to "${existingNode.title}": ${similarity.toFixed(3)}`);
            }
        }
        
        // 4. Apply gravitational offset to base position
        const dampening = 0.1; // Prevent extreme movements
        const finalPosition = {
            x: basePosition.x + (totalForce.x * dampening),
            y: basePosition.y + (totalForce.y * dampening),
            z: basePosition.z + (totalForce.z * dampening)
        };
        
        // 5. Calculate orbital mechanics
        const orbitalData = calculateOrbitalMechanics(finalPosition);
        
        console.log(`✅ Autonomous positioning complete:`);
        console.log(`   Position: (${finalPosition.x.toFixed(1)}, ${finalPosition.y.toFixed(1)}, ${finalPosition.z.toFixed(1)})`);
        console.log(`   Orbital radius: ${orbitalData.radius.toFixed(1)}`);
        console.log(`   Gravitational attractions: ${attractionCount}`);
        
        return {
            ...node,
            equilibrium_position: finalPosition,
            orbital_radius: orbitalData.radius,
            orbital_velocity: orbitalData.velocity,
            gravitational_attractions: attractionCount,
            positioning_method: 'autonomous_gravitational',
            field_strength: Math.sqrt(totalForce.x*totalForce.x + totalForce.y*totalForce.y + totalForce.z*totalForce.z)
        };
    } catch (error) {
        console.error('❌ Error in autonomous positioning:', error);
        // Fallback to base position if gravitational calculation fails
        return {
            ...node,
            equilibrium_position: parseFractalAddress(node.fractal_address),
            positioning_method: 'fallback_fractal'
        };
    }
}

// Helper functions for gravitational mechanics
function parseFractalAddress(address) {
    const parts = address.split('.');
    const parsed = {
        root: parts[0] || 'NEXUS',
        core: parts[1] || 'CORE',
        glyph: parts[2] || '⧬✶⧬',
        branch: parts[3] || 'GENERAL',
        domain: parts[4] || 'KNOWLEDGE',
        version: parts[5] || 'v1.0',
        section: parts[6] || 'main',
        depth: parts.length - 3
    };
    
    // Spiral arm mapping based on knowledge domain
    const branchMap = {
        'HARMONIC': 0,     // Harmonic fusion arm
        'MATHEMATICAL': 1, // Mathematical proofs arm  
        'INTERACTIVE': 2,  // Interactive tools arm
        'APEX': 3,         // APEX scrolls arm
        'GENERAL': 4       // General knowledge
    };
    
    const armIndex = branchMap[parsed.branch] || 4;
    const armAngle = (armIndex * Math.PI * 2 / 5); // 5 arms total
    const baseRadius = 100 + (parsed.depth * 50);
    const spiralOffset = parsed.depth / PHI; // φ-based spiral
    const theta = armAngle + spiralOffset;
    
    return {
        x: baseRadius * Math.cos(theta),
        y: baseRadius * Math.sin(theta),
        z: Math.sin(parsed.depth * 0.3) * 20, // Vertical variation
        armIndex: armIndex,
        depth: parsed.depth
    };
}

async function calculateSemanticSimilarity(node1, node2) {
    const content1 = (node1.title + ' ' + (node1.content || '')).toLowerCase();
    const content2 = (node2.title + ' ' + (node2.content || '')).toLowerCase();
    
    // Jaccard similarity
    const words1 = new Set(content1.split(/\s+/));
    const words2 = new Set(content2.split(/\s+/));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    const jaccard = intersection.size / union.size;
    
    // Mathematical concept boost
    const mathTerms = ['432', 'psi', 'phi', 'ψ₀', 'φ', 'harmonic', 'fusion', 'prime', 'ratio', 'fibonacci', 'golden'];
    let mathBoost = 0;
    mathTerms.forEach(term => {
        if (content1.includes(term) && content2.includes(term)) {
            mathBoost += 0.1;
        }
    });
    
    // Fractal address similarity
    const addr1 = (node1.fractal_address || '').split('.');
    const addr2 = (node2.fractal_address || '').split('.');
    let addressSimilarity = 0;
    const maxLength = Math.min(addr1.length, addr2.length);
    for (let i = 0; i < maxLength; i++) {
        if (addr1[i] === addr2[i]) addressSimilarity += 0.1;
    }
    
    return Math.min(1.0, jaccard + mathBoost + addressSimilarity);
}

function calculateGravitationalForce(node1, node2, similarity) {
    const mass1 = node1.gravitational_mass || 1.0;
    const mass2 = node2.gravitational_mass || 1.0;
    
    const pos1 = node1.equilibrium_position || { x: 0, y: 0, z: 0 };
    const pos2 = node2.equilibrium_position || { x: 0, y: 0, z: 0 };
    
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    const dz = pos2.z - pos1.z;
    const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
    
    if (distance === 0) return { x: 0, y: 0, z: 0 };
    
    // Enhanced gravitational law with similarity
    const force = (G * similarity * mass1 * mass2) / (distance * distance);
    
    return {
        x: force * (dx / distance),
        y: force * (dy / distance),
        z: force * (dz / distance)
    };
}

function calculateOrbitalMechanics(position) {
    const centerDistance = Math.sqrt(
        position.x * position.x + 
        position.y * position.y + 
        position.z * position.z
    );
    
    const centralMass = 1000; // Nexus Core mass
    const orbitalVelocity = Math.sqrt(centralMass / Math.max(centerDistance, 1)) * 0.01;
    
    return {
        radius: centerDistance,
        velocity: orbitalVelocity
    };
}

function calculateGalaxyStatistics(nodes) {
    if (nodes.length === 0) return { message: 'Empty galaxy - ready for first knowledge' };
    
    const domains = {};
    const positions = [];
    let totalMass = 0;
    
    nodes.forEach(node => {
        const domain = node.fractal_address?.split('.')[3] || 'UNKNOWN';
        domains[domain] = (domains[domain] || 0) + 1;
        
        if (node.equilibrium_position) {
            positions.push(node.equilibrium_position);
        }
        
        totalMass += (node.gravitational_mass || 1.0);
    });
    
    // Calculate galaxy spread
    let maxDistance = 0;
    if (positions.length > 1) {
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const dist = Math.sqrt(
                    Math.pow(positions[i].x - positions[j].x, 2) +
                    Math.pow(positions[i].y - positions[j].y, 2) +
                    Math.pow(positions[i].z - positions[j].z, 2)
                );
                maxDistance = Math.max(maxDistance, dist);
            }
        }
    }
    
    return {
        total_nodes: nodes.length,
        domain_distribution: domains,
        galaxy_radius: maxDistance.toFixed(1),
        total_gravitational_mass: totalMass.toFixed(2),
        autonomous_clusters: Object.keys(domains).length,
        positioning_complete: positions.length
    };
}

function generateNodeId(nodeData) {
    const timestamp = Date.now();
    const titleHash = (nodeData.title || 'unknown').replace(/\s+/g, '_').substring(0, 20);
    return `NEXUS.NODE.${titleHash}.${timestamp}`;
}

function generateFractalAddress(nodeData) {
    const domain = detectDomain(nodeData.title || '', nodeData.content || '');
    const timestamp = Date.now();
    const titleSlug = (nodeData.title || 'unknown').replace(/\s+/g, '_').substring(0, 15);
    
    return `NEXUS.CORE.⧬✶⧬.${domain}.${titleSlug}.v1.0.${timestamp}`;
}

function detectDomain(title, content) {
    const text = (title + ' ' + content).toLowerCase();
    
    const keywords = {
        'HARMONIC': ['432', 'frequency', 'harmonic', 'resonance', 'fusion', 'energy'],
        'MATHEMATICAL': ['equation', 'proof', 'theorem', 'calculation', 'formula', 'ψ₀', 'φ'],
        'INTERACTIVE': ['visualization', 'tool', 'interface', 'dashboard', 'simulator'],
        'APEX': ['scroll', 'minting', 'sovereignty', 'protocol', 'blockchain']
    };
    
    for (const [domain, terms] of Object.entries(keywords)) {
        if (terms.some(term => text.includes(term))) {
            return domain;
        }
    }
    
    return 'GENERAL';
}