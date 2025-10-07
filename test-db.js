const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://himani:<db_password>@ems.z3zxn2h.mongodb.net/?retryWrites=true&w=majority&appName=EMS';

async function testDatabaseConnection() {
    try {
        console.log('🔄 Testing MongoDB connection...');
        console.log('📡 Connecting to:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
        
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('✅ Successfully connected to MongoDB!');
        console.log('📊 Database:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('🔌 Port:', mongoose.connection.port);
        
        // Test creating a simple document
        const testSchema = new mongoose.Schema({
            test: String,
            timestamp: { type: Date, default: Date.now }
        });
        
        const TestModel = mongoose.model('Test', testSchema);
        
        const testDoc = new TestModel({ test: 'Database connection test' });
        await testDoc.save();
        
        console.log('✅ Test document created successfully!');
        console.log('📄 Document ID:', testDoc._id);
        
        // Clean up test document
        await TestModel.deleteOne({ _id: testDoc._id });
        console.log('🧹 Test document cleaned up');
        
        await mongoose.connection.close();
        console.log('✅ Database connection test completed successfully!');
        
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.error('🔍 Make sure to update the password in config.js');
        process.exit(1);
    }
}

testDatabaseConnection();
