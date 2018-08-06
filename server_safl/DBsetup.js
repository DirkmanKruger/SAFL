//var MongoClient = require('mongodb').MongoClient,
//        assert = require('assert');
//
//var dboper = require('./DBpopulate');
//
//// Connection URL
//var url = 'mongodb://localhost:27017/fishingLog';
//
//// Use connect method to connect to the Server
//MongoClient.connect(url, function (err, db) {
//    assert.equal(null, err);
//    console.log("Connected correctly to server");
//
//    dboper.insertDocument(db, {name: "Vadonut", description: "Test"},
//            "dishes", function (result) {
//                console.log(result.ops);
//
//                dboper.findDocuments(db, "dishes", function (docs) {
//                    console.log(docs);
//
//                    dboper.updateDocument(db, {name: "Vadonut"},
//                            {description: "Updated Test"},
//                            "dishes", function (result) {
//                                console.log(result.result);
//
//                                dboper.findDocuments(db, "dishes", function (docs) {
//                                    console.log(docs);
//
//                                    db.dropCollection("dishes", function (result) {
//                                        console.log(result);
//
//                                        db.close();
//                                    });
//                                });
//                            });
//                });
//            });
//});

//var MongoClient = require('mongodb').MongoClient,
//        assert = require('assert');
//
//// Connection URL
//var url = 'mongodb://localhost:27017/conFusion';
//// Use connect method to connect to the Server
//MongoClient.connect(url, function (err, db) {
//    assert.equal(err,null);
//    console.log("Connected correctly to server");
//    var collection = db.collection("dishes");
//    collection.insertOne({name: "Uthapizza", description: "test"}, function(err,result){
//        assert.equal(err,null);
//        console.log("After Insert:");
//        console.log(result.ops);
//        collection.find({}).toArray(function(err,docs){
//            assert.equal(err,null);
//            console.log("Found:");
//            console.log(docs);
//            db.dropCollection("dishes", function(err, result){
//                assert.equal(err,null);
//                db.close();
//            });
//        });
//    });
//});
/////////////////////////////

// Load mongoose package
var mongoose = require('mongoose');
// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://localhost/fishingLog');

var User = require('./models/user');
var Catch = require('./models/catches');
var Specie = require('./models/species');
var Knot = require('./models/knots');

// Create new Users
var user = new User({username: 'Dirk', password: 'dirk', firstname: 'Dirk', lastname: 'Kruger', admin: false});
var admin = new User({username: 'Admin', password: 'admin', firstname: 'Admin', lastname: 'Admin', admin: true});
var allUsers = [user, admin];

// Save it to database
User.collection.insert(allUsers, onInsert);
function onInsert(err, docs) {
    if (err) {
        console.log(err);
    } else {
        console.info('%d Users were successfully stored.', docs.length);
    }
}


// Create new Catches
var catchObj1 = new Catch({specie: 'Barbel',lure: 'Fly', location: 'Gariep Dam', waterType: 'Fresh', length: 55, weight: 12.5, released: true, image:'../images/catches/default-img.png'});
var catchObj2 = new Catch({specie: 'Trout',lure: 'Fly', location: 'Drakensberg', waterType: 'Fresh', length: 19, weight: 1.5, released: true, image:'../images/catches/default-img.png'});
var allCatches = [catchObj1, catchObj2];

// Save it to database
Catch.collection.insert(allCatches, onInsert);
function onInsert(err, docs) {
    if (err) {
        console.log(err);
    } else {
        console.info('%d Catches were successfully stored.', docs.length);
    }
}


// Create new Species
var BrownTrout = new Specie({name:'Brown Trout',type:'Fresh',adultLength:30,averageWeight:1.5,commonLocations:'Scotland, Argentina',image:'/images/species/BrownTrout.png'});
var GreatWhite = new Specie({name: 'Great White Shark', type: 'Salt', adultLength: 600, averageWeight: 500, commonLocations: 'Atlantic Ocean, Great Barrier Reef', image:'/images/species/GreatWhite.png'});
var RainbowTrout = new Specie({name:'Rainbow Trout',type:'Fresh',adultLength:33,averageWeight:2.5,commonLocations:'Scotland, Argentina',image:'/images/species/RainbowTrout.png'});
var StarryTriggerfish = new Specie({name:'Starry Triggerfish',type:'Fresh',adultLength:60,averageWeight:2.5,commonLocations:'Scotland, Argentina',image:'/images/species/StarryTriggerfish.png'});
var FourbarDamsel = new Specie({name:'Fourbar Damsel',type:'Fresh',adultLength:17,averageWeight:1.2,commonLocations:'Scotland,Argentina',image:'/images/species/FourbarDamsel.png'});
var DuskyDamsel = new Specie({name:'Dusky Damsel',type:'Fresh',adultLength:17,averageWeight:1.2,commonLocations:'Scotland,Argentina',image:'/images/species/DuskyDamsel.png'});
var SevenbarDamsel = new Specie({name:'Sevenbar Damsel',type:'Fresh',adultLength:23,averageWeight:1.1,commonLocations:'Scotland,Argentina',image:'/images/species/SevenbarDamsel.png'});
var SpotDamsel = new Specie({name:'Spot Damsel',type:'Fresh',adultLength:44,averageWeight:3.5,commonLocations:'Scotland,Argentina',image:'/images/species/SpotDamsel.png'});
var FalseEyeDamsel = new Specie({name:'False-eye Damsel',type:'Fresh',adultLength: 16,averageWeight:1.3,commonLocations:'Scotland,Argentina',image:'/images/species/FalseEyeDamsel.png'});
var SergeantMajor = new Specie({name:'Sergeant Major',type:'Fresh',adultLength: 20,averageWeight:1.4,commonLocations:'Scotland,Argentina',image:'/images/species/SergeantMajor.png'});
var ScalyjawKoester = new Specie({name:'Scaly Jaw Koester',type:'Fresh',adultLength: 24,averageWeight:16.5,commonLocations:'Scotland,Argentina',image:'/images/species/ScalyjawKoester.png'});
var Koester = new Specie({name:'Koester',type:'Fresh',adultLength: 35,averageWeight:1.55,commonLocations:'Scotland,Argentina',image:'/images/species/Koester.png'});
var Riverbream = new Specie({name:'Riverbream',type:'Fresh',adultLength: 55,averageWeight:1.53,commonLocations:'Scotland,Argentina',image:'/images/species/Riverbream.png'});
var Scottie = new Specie({name:'Scottie',type:'Fresh',adultLength: 15,averageWeight:1.15,commonLocations:'Scotland,Argentina',image:'/images/species/Scottie.png'});
var ScrawledCowfish = new Specie({name:'Scrawled Cowfish',type:'Fresh',adultLength: 45,averageWeight:2.2,commonLocations:'Scotland,Argentina',image:'/images/species/ScrawledCowfish.png'});
var TailringSurgeon = new Specie({name:'Tailring Surgeon',type:'Fresh',adultLength: 35,averageWeight:3.2,commonLocations:'Scotland,Argentina',image:'/images/species/TailringSurgeon.png'});
var PencilledSurgeon = new Specie({name:'Pencilled Surgeon',type:'Fresh',adultLength: 24,averageWeight:4.1,commonLocations:'Scotland,Argentina',image:'/images/species/PencilledSurgeon.png'});
var PowderBlueSurgeonfish = new Specie({name:'Powder-blue Surgeonfish',type:'Fresh',adultLength: 14,averageWeight:5.5,commonLocations:'Scotland,Argentina',image:'/images/species/PowderBlueSurgeonfish.png'});
var BluebandedSurgeon = new Specie({name:'Bluebanded Surgeon',type:'Fresh',adultLength: 38,averageWeight:6.3,commonLocations:'Scotland,Argentina',image:'/images/species/BluebandedSurgeon.png'});
var ElongateSurgeon = new Specie({name:'Elongate Surgeon',type:'Fresh',adultLength: 50,averageWeight:7.4,commonLocations:'Scotland,Argentina',image:'/images/species/ElongateSurgeon.png'});
var EpauletteSurgeon = new Specie({name:'Epaulette Surgeon',type:'Fresh',adultLength: 40,averageWeight:8.6,commonLocations:'Scotland,Argentina',image:'/images/species/EpauletteSurgeon.png'});
var BrownSurgeon = new Specie({name:'Brown Surgeon',type:'Fresh',adultLength: 21,averageWeight:6.55,commonLocations:'Scotland,Argentina',image:'/images/species/BrownSurgeon.png'});
var LieutenantSurgeonfish = new Specie({name:'Lieutenant Surgeonfish',type:'Fresh',adultLength: 31,averageWeight:143.5,commonLocations:'Scotland,Argentina',image:'/images/species/LieutenantSurgeonfish.png'});
var ChocolateSurgeon = new Specie({name:'Chocolate Surgeon',type:'Fresh',adultLength: 27,averageWeight:3.15,commonLocations:'Scotland,Argentina',image:'/images/species/ChocolateSurgeon.png'});
var ConvictSurgeon = new Specie({name:'Convict Surgeon',type:'Fresh',adultLength: 14,averageWeight:9.5,commonLocations:'Scotland,Argentina',image:'/images/species/ConvictSurgeon.png'});
var ShadowGoby = new Specie({name:'Shadow Goby',type:'Fresh',adultLength: 18,averageWeight:1.5,commonLocations:'Scotland,Argentina',image:'/images/species/ShadowGoby.png'});
var Lanternbelly = new Specie({name:'Lanternbelly',type:'Fresh',adultLength: 15.1,averageWeight:1.5,commonLocations:'Scotland,Argentina',image:'/images/species/Lanternbelly.png'});
var UnicornSole = new Specie({name:'Unicorn Sole',type:'Fresh',adultLength: 25,averageWeight:3.5,commonLocations:'Scotland,Argentina',image:'/images/species/UnicornSole.png'});
var RedmouthRockcod = new Specie({name:'Redmouth Rockcod',type:'Fresh',adultLength: 60,averageWeight:5.5,commonLocations:'Scotland,Argentina',image:'/images/species/RedmouthRockcod.png'});
var DuckbillRay = new Specie({name:'Duckbill Ray',type:'Fresh',adultLength: 222,averageWeight:7.5,commonLocations:'Scotland,Argentina',image:'/images/species/DuckbillRay.png'});
var Bonefish = new Specie({name:'Bonefish',type:'Fresh',adultLength: 100,averageWeight:1.5,commonLocations:'Scotland,Argentina',image:'/images/species/Bonefish.png'});
var ThreadfinMirrorfish = new Specie({name:'Threadfin Mirrorfish',type:'Fresh',adultLength: 150,averageWeight:8.2,commonLocations:'Scotland,Argentina',image:'/images/species/ThreadfinMirrorfish.png'});
var IndianMirrorfish = new Specie({name:'Indian Mirrorfish',type:'Fresh',adultLength: 165,averageWeight:9.2,commonLocations:'Scotland,Argentina',image:'/images/species/IndianMirrorfish.png'});
var ShrimpScad = new Specie({name:'Shrimp Scad',type:'Fresh',adultLength: 40,averageWeight:1.1,commonLocations:'Scotland,Argentina',image:'/images/species/ShrimpScad.png'});
var SlenderTuna = new Specie({name:'Slender Tuna',type:'Fresh',adultLength: 105,averageWeight:2.5,commonLocations:'Scotland,Argentina',image:'/images/species/SlenderTuna.png'});
var SmalltoothThresher = new Specie({name:'Smalltooth Thresher',type:'Fresh',adultLength: 383,averageWeight:1.3,commonLocations:'Scotland,Argentina',image:'/images/species/SmalltoothThresher.png'});
var BigeyeThresher = new Specie({name:'Bigeye Thresher',type:'Fresh',adultLength: 480,averageWeight:4.4,commonLocations:'Scotland,Argentina',image:'/images/species/BigeyeThresher.png'});
var UnicornLeatherjacket = new Specie({name:'Unicorn Leatherjacket',type:'Fresh',adultLength: 76.2,averageWeight:1.6,commonLocations:'Scotland,Argentina',image:'/images/species/UnicornLeatherjacket.png'});
var ScribbledLeatherjacket = new Specie({name:'Scribbled Leatherjacket',type:'Fresh',adultLength: 110,averageWeight:6.5,commonLocations:'Scotland,Argentina',image:'/images/species/ScribbledLeatherjacket.png'});
var LongspineGlassy = new Specie({name:'Longspine Glassy',type:'Fresh',adultLength: 15,averageWeight:1.3,commonLocations:'Scotland,Argentina',image:'/images/species/LongspineGlassy.png'});
var BaldGlassy = new Specie({name:'Bald Glassy',type:'Fresh',adultLength:5.3,averageWeight:2.15,commonLocations:'Scotland,Argentina',image:'/images/species/BaldGlassy.png'});
var SlenderGlassy = new Specie({name:'Slender Glassy',type:'Fresh',adultLength: 9,averageWeight:3.1,commonLocations:'Scotland,Argentina',image:'/images/species/SlenderGlassy.png'});
var TwospotHawkfish = new Specie({name:'Twospot Hawkfish',type:'Fresh',adultLength: 8.5,averageWeight:1.2,commonLocations:'Scotland,Argentina',image:'/images/species/TwospotHawkfish.png'});
var PinkbarGoby = new Specie({name:'Pinkbar Goby',type:'Fresh',adultLength: 11,averageWeight:4.3,commonLocations:'Scotland,Argentina',image:'/images/species/PinkbarGoby.png'});
var GorgeousGoby = new Specie({name:'Gorgeous Goby',type:'Fresh',adultLength: 10,averageWeight:1.4,commonLocations:'Scotland,Argentina',image:'/images/species/GorgeousGoby.png'});
var ButterflyGoby = new Specie({name:'Butterfly Goby',type:'Fresh',adultLength: 18,averageWeight:6.5,commonLocations:'Scotland,Argentina',image:'/images/species/ButterflyGoby.png'});
var EvileyeBlaasop = new Specie({name:'Evileye Blaasop',type:'Fresh',adultLength: 30,averageWeight:1.6,commonLocations:'Scotland,Argentina',image:'/images/species/EvileyeBlaasop.png'});
var NatalMountainCatfish = new Specie({name:'Natal Mountain Catfish',type:'Fresh',adultLength: 12.5,averageWeight:7.8,commonLocations:'Scotland,Argentina',image:'/images/species/NatalMountainCatfish.png'});
var StargazerMountainCatfish =new Specie({name:'Stargazer Mountain Catfish',type:'Fresh', adultLength:19.5,averageWeight:1.9,commonLocations:'Scotland,Argentina',image:'/images/species/StargazerMountainCatfish.png'});
var NosestripeAnemonefish = new Specie({name:'Nosestripe Anemonefish',type:'Fresh',adultLength: 11,averageWeight:11.1,commonLocations:'Scotland,Argentina',image:'/images/species/NosestripeAnemonefish.png'});
var TwobarAnemonefish = new Specie({name:'Twobar Anemonefish',type:'Fresh',adultLength: 15,averageWeight:13.2,commonLocations:'Scotland,Argentina',image:'/images/species/TwobarAnemonefish.png'});
var SpottedLegSkate = new Specie({name:'Spotted Leg Skate',type:'Fresh',adultLength: 29,averageWeight:14.5,commonLocations:'Scotland,Argentina',image:'/images/species/SpottedLegSkate.png'});
var BluespottedTamarin = new Specie({name:'Bluespotted Tamarin',type:'Fresh',adultLength: 42,averageWeight:15.5,commonLocations:'Scotland,Argentina',image:'/images/species/BluespottedTamarin.png'});
var LinedTamarin = new Specie({name:'Lined Tamarin',type:'Fresh',adultLength: 13,averageWeight:16.5,commonLocations:'Scotland,Argentina',image:'/images/species/LinedTamarin.png'});
var YellowtailTamarin = new Specie({name:'Yellowtail Tamarin',type:'Fresh',adultLength: 22,averageWeight:4.3,commonLocations:'Scotland,Argentina',image:'/images/species/YellowtailTamarin.png'});
var MarbledReefEel = new Specie({name:'Marbled Reef-eel',type:'Fresh',adultLength: 29,averageWeight:5.2,commonLocations:'Scotland,Argentina',image:'/images/species/MarbledReefEel.png'});
var NatalWrasse = new Specie({name:'Natal Wrasse',type:'Fresh',adultLength: 75,averageWeight:6.1,commonLocations:'Scotland,Argentina',image:'/images/species/NatalWrasse.png'});
var GiantMottledEel = new Specie({name:'Giant Mottled Eel',type:'Fresh',adultLength:200,averageWeight:1.5,commonLocations:'Scotland,Argentina',image:'/images/species/GiantMottledEel.png'});
var LongfinEel = new Specie({name:'Longfin Eel',type:'Fresh',adultLength: 150,averageWeight:1.5,commonLocations:'Scotland,Argentina',image:'/images/species/LongfinEel.png'});
var ChubbyBasketfish = new Specie({name:'Chubby Basketfish',type:'Fresh',adultLength: 37,averageWeight:9.5,commonLocations:'Scotland,Argentina',image:'/images/species/ChubbyBasketfish.png'});
var Fangtooth = new Specie({name:'Fangtooth',type:'Fresh',adultLength: 18,averageWeight:5.5,commonLocations:'Scotland,Argentina',image:'/images/species/Fangtooth.png'});
var MoustachedRockskipper = new Specie({name:'Moustached Rockskipper',type:'Fresh',adultLength: 7,averageWeight:1.2,commonLocations:'Scotland,Argentina',image:'/images/species/MoustachedRockskipper.png'});
var HornedRockskipper = new Specie({name:'Horned Rockskipper',type:'Fresh',adultLength: 7.5,averageWeight:2.2,commonLocations:'Scotland,Argentina',image:'/images/species/HornedRockskipper.png'});
var BigAngler = new Specie({name:'Big Angler',type:'Fresh',adultLength: 45,averageWeight:2.1,commonLocations:'Scotland,Argentina',image:'/images/species/BigAngler.png'});
var FishingFrog = new Specie({name:'Fishing Frog',type:'Fresh',adultLength:20,averageWeight:1.5,commonLocations:'Scotland,Argentina',image:'/images/species/FishingFrog.png'});
var PaintedAngler = new Specie({name:'Painted Angler',type:'Fresh',adultLength: 30,averageWeight:5.3,commonLocations:'Scotland,Argentina',image:'/images/species/PaintedAngler.png'});
var StripedAngler = new Specie({name:'Striped Angler',type:'Fresh',adultLength: 25,averageWeight:3.4,commonLocations:'Scotland,Argentina',image:'/images/species/StripedAngler.png'});
var FreckledAngler = new Specie({name:'Freckled Angler',type:'Fresh',adultLength: 13,averageWeight:4.6,commonLocations:'Scotland,Argentina',image:'/images/species/FreckledAngler.png'});
var SpotfinAngler = new Specie({name:'Spotfin Angler',type:'Fresh',adultLength: 13,averageWeight:6.5,commonLocations:'Scotland,Argentina',image:'/images/species/SpotfinAngler.png'});
var PygmyAngler = new Specie({name:'Pygmy Angler',type:'Fresh',adultLength: 9,averageWeight:5.3,commonLocations:'Scotland,Argentina',image:'/images/species/PygmyAngler.png'});
var BlueSmalltoothJob = new Specie({name:'Blue Smalltooth Job',type:'Fresh',adultLength: 70,averageWeight:11.5,commonLocations:'Scotland,Argentina',image:'/images/species/BlueSmalltoothJob.png'});
var BeardedWaspfish = new Specie({name:'Bearded Waspfish',type:'Fresh',adultLength: 20,averageWeight:12.5,commonLocations:'Scotland,Argentina',image:'/images/species/BeardedWaspfish.png'});
var ChubbyClingfish = new Specie({name:'Chubby Clingfish',type:'Fresh',adultLength: 5,averageWeight:2.5,commonLocations:'Scotland,Argentina',image:'/images/species/ChubbyClingfish.png'});
var RubyCardinal = new Specie({name:'Ruby Cardinal',type:'Fresh',adultLength: 6,averageWeight:1.9,commonLocations:'Scotland,Argentina',image:'/images/species/RubyCardinal.png'});
var ThreebandCardinal = new Specie({name:'Threeband Cardinal',type:'Fresh',adultLength: 7.5,averageWeight:5.8,commonLocations:'Scotland,Argentina',image:'/images/species/ThreebandCardinal.png'});
var SadCardinal = new Specie({name:'Sad Cardinal',type:'Fresh',adultLength: 9,averageWeight:3.7,commonLocations:'Scotland,Argentina',image:'/images/species/SadCardinal.png'});
var OcellatedCardinal = new Specie({name:'Ocellated Cardinal',type:'Fresh',adultLength: 6,averageWeight:4.6,commonLocations:'Scotland,Argentina',image:'/images/species/OcellatedCardinal.png'});
var SpeckledCardinal = new Specie({name:'Speckled Cardinal',type:'Fresh',adultLength: 6,averageWeight:6.5,commonLocations:'Scotland,Argentina',image:'/images/species/SpeckledCardinal.png'});
var TigerAngelfish = new Specie({name:'Tiger Angelfish',type:'Fresh',adultLength: 21,averageWeight:5.4,commonLocations:'Scotland,Argentina',image:'/images/species/TigerAngelfish.png'});
var ThreespotAngelfish = new Specie({name:'Threespot Angelfish',type:'Fresh',adultLength: 26,averageWeight:3.3,commonLocations:'Scotland,Argentina',image:'/images/species/ThreespotAngelfish.png'});
var BlotchedPodge = new Specie({name:'Blotched Podge',type:'Fresh',adultLength: 11,averageWeight:1.2,commonLocations:'Scotland,Argentina',image:'/images/species/BlotchedPodge.png'});
var SoldierBream = new Specie({name:'Soldier Bream',type:'Fresh',adultLength: 38,averageWeight:1.1,commonLocations:'Scotland,Argentina',image:'/images/species/SoldierBream.png'});
var KingSoldierbream = new Specie({name:'King Soldierbream',type:'Fresh',adultLength: 70,averageWeight:1.2,commonLocations:'Scotland,Argentina',image:'/images/species/KingSoldierbream.png'});
var WestCoastKob = new Specie({name:'West Coast Kob',type:'Fresh',adultLength: 200,averageWeight:1.5,commonLocations:'Scotland,Argentina',image:'/images/species/WestCoastKob.png'});
var DuskyKob = new Specie({name:'Dusky Kob',type:'Fresh',adultLength: 200,averageWeight:1.5,commonLocations:'Scotland,Argentina',image:'/images/species/DuskyKob.png'});
var SquaretailKob = new Specie({name:'Squaretail Kob',type:'Fresh',adultLength: 71,averageWeight:1.5,commonLocations:'Scotland,Argentina',image:'/images/species/SquaretailKob.png'});
var Silverfish = new Specie({name:'Silverfish',type:'Fresh',adultLength: 90,averageWeight:1.5,commonLocations:'Scotland,Argentina',image:'/images/species/Silverfish.png'});
var IndianDriftfish = new Specie({name:'Indian Driftfish',type:'Fresh',adultLength: 25,averageWeight:2.1,commonLocations:'Scotland,Argentina',image:'/images/species/IndianDriftfish.png'});
var TropicalConger = new Specie({name:'Tropical Conger',type:'Fresh',adultLength: 20,averageWeight:2.5,commonLocations:'Scotland,Argentina',image:'/images/species/TropicalConger.png'});
var EastCoastFlounder = new Specie({name:'EastCoast Flounder',type:'Fresh',adultLength: 19,averageWeight:1.3,commonLocations:'Scotland,Argentina',image:'/images/species/EastCoastFlounder.png'});
var WhitespottedBlaasop = new Specie({name:'Whitespotted Blaasop',type:'Fresh',adultLength: 50,averageWeight:5.4,commonLocations:'Scotland,Argentina',image:'/images/species/WhitespottedBlaasop.png'});
var BlackedgedBlaasop = new Specie({name:'Blackedged Blaasop',type:'Fresh',adultLength: 30,averageWeight:3.6,commonLocations:'Scotland,Argentina',image:'/images/species/BlackedgedBlaasop.png'});
var BellystripedBlaasop = new Specie({name:'Bellystriped Blaasop',type:'Fresh',adultLength: 40,averageWeight:4.5,commonLocations:'Scotland,Argentina',image:'/images/species/BellystripedBlaasop.png'});
var MapBlaasop = new Specie({name:'Map Blaasop',type:'Fresh',adultLength: 65,averageWeight:6.3,commonLocations:'Scotland,Argentina',image:'/images/species/MapBlaasop.png'});
var GuineafowlBlaasop = new Specie({name:'Guineafowl Blaasop',type:'Fresh',adultLength: 50,averageWeight:5.1,commonLocations:'Scotland,Argentina',image:'/images/species/GuineafowlBlaasop.png'});
var BlackspottedBlaasop = new Specie({name:'Blackspotted Blaasop',type:'Fresh',adultLength: 33,averageWeight:3.1,commonLocations:'Scotland,Argentina',image:'/images/species/BlackspottedBlaasop.png'});
var StarBlaasop = new Specie({name:'Star Blaasop',type:'Fresh',adultLength: 120,averageWeight:2.1,commonLocations:'Scotland,Argentina',image:'/images/species/StarBlaasop.png'});
var DwarfSole = new Specie({name:'Dwarf Sole',type:'Fresh',adultLength: 8,averageWeight:2.8,commonLocations:'Scotland,Argentina',image:'/images/species/DwarfSole.png'});
var FloatingBlenny = new Specie({name:'Floating Blenny',type:'Fresh',adultLength: 12,averageWeight:1.9,commonLocations:'Scotland,Argentina',image:'/images/species/FloatingBlenny.png'});
var MimicBlenny = new Specie({name:'Mimic Blenny',type:'Fresh',adultLength: 10,averageWeight:5.5,commonLocations:'Scotland,Argentina',image:'/images/species/MimicBlenny.png'});
var StarryfinGoby = new Specie({name:'Starryfin Goby',type:'Fresh',adultLength: 6.5,averageWeight:3.5,commonLocations:'Scotland,Argentina',image:'/images/species/StarryfinGoby.png'});
var HardyheadSilverside = new Specie({name:'Hardyhead Silverside',type:'Fresh',adultLength: 25,averageWeight:4.3,commonLocations:'Scotland,Argentina',image:'/images/species/HardyheadSilverside.png'});
var LongfinKob = new Specie({name:'Longfin Kob',type:'Fresh',adultLength: 47,averageWeight:6.4,commonLocations:'Scotland,Argentina',image:'/images/species/LongfinKob.png'});
var YellowtailScad = new Specie({name:'Yellowtail Scad',type:'Fresh',adultLength: 30,averageWeight:5.6,commonLocations:'Scotland,Argentina',image:'/images/species/YellowtailScad.png'});
var GoldribbonSoapfish = new Specie({name:'Goldribbon Soapfish',type:'Fresh',adultLength: 27,averageWeight:3.5,commonLocations:'Scotland,Argentina',image:'/images/species/GoldribbonSoapfish.png'});
var Trumpetfish = new Specie({name:'Trumpetfish',type:'Fresh',adultLength: 80,averageWeight:11.3,commonLocations:'Scotland,Argentina',image:'/images/species/Trumpetfish.png'});
var PuzzledToadfish = new Specie({name:'Puzzled Toadfish',type:'Fresh',adultLength: 27,averageWeight:1.7,commonLocations:'Scotland,Argentina',image:'/images/species/PuzzledToadfish.png'});
var BulletTuna = new Specie({name:'Bullet Tuna',type:'Fresh',adultLength:66,averageWeight:1.8,commonLocations:'Scotland,Argentina',image:'/images/species/BulletTuna.png'});

var allSpecies = [
        BrownTrout, GreatWhite, RainbowTrout, StarryTriggerfish, FourbarDamsel, DuskyDamsel, SevenbarDamsel, SpotDamsel, FalseEyeDamsel, SergeantMajor, ScalyjawKoester, Koester, Riverbream, Scottie, ScrawledCowfish, TailringSurgeon, PencilledSurgeon,
        PowderBlueSurgeonfish, BluebandedSurgeon, ElongateSurgeon, EpauletteSurgeon, BrownSurgeon, LieutenantSurgeonfish, ChocolateSurgeon, ConvictSurgeon, ShadowGoby, Lanternbelly, UnicornSole, RedmouthRockcod, DuckbillRay, Bonefish, ThreadfinMirrorfish,
        IndianMirrorfish, ShrimpScad, SlenderTuna, SmalltoothThresher, BigeyeThresher, UnicornLeatherjacket, ScribbledLeatherjacket, LongspineGlassy, BaldGlassy, SlenderGlassy, TwospotHawkfish, PinkbarGoby, GorgeousGoby, ButterflyGoby, EvileyeBlaasop,
        NatalMountainCatfish, StargazerMountainCatfish, NosestripeAnemonefish, TwobarAnemonefish, SpottedLegSkate, BluespottedTamarin, LinedTamarin, YellowtailTamarin, MarbledReefEel, NatalWrasse, GiantMottledEel, LongfinEel, ChubbyBasketfish,
        Fangtooth, MoustachedRockskipper, HornedRockskipper, BigAngler, FishingFrog, PaintedAngler, StripedAngler, FreckledAngler, SpotfinAngler, PygmyAngler, BlueSmalltoothJob, BeardedWaspfish, ChubbyClingfish, RubyCardinal, ThreebandCardinal,
        SadCardinal, OcellatedCardinal, SpeckledCardinal, TigerAngelfish, ThreespotAngelfish, BlotchedPodge, SoldierBream, KingSoldierbream, WestCoastKob, DuskyKob, SquaretailKob, Silverfish, IndianDriftfish, TropicalConger, EastCoastFlounder,
        WhitespottedBlaasop, BlackedgedBlaasop, BellystripedBlaasop, MapBlaasop, GuineafowlBlaasop, BlackspottedBlaasop, StarBlaasop, DwarfSole, FloatingBlenny, MimicBlenny, StarryfinGoby, HardyheadSilverside, LongfinKob, YellowtailScad,
        GoldribbonSoapfish, Trumpetfish, PuzzledToadfish, BulletTuna];


// Save it to database
Specie.collection.insert(allSpecies, onInsert);
function onInsert(err, docs) {
    if (err) {
        console.log(err);
    } else {
        console.info('%d Species were successfully stored.', docs.length);
    }
}


// Create new Knots
var albright = new Knot({name: 'Albright Knot', description: 'Tied to connect two different sizes of monofilament together, or connecting monofilament to spectra. Very popular for tying a leader onto a marlin or swordfish casting outfit. When used in connecting spectra to monofilament increase number of turns to 21 in step 2. The spectra should also be doubled with a Bimini Twist knot prior to tying the Albright.', howtoUrl: '/images/knots/Albright.png'});
var blood = new Knot({name: 'Blood Knot', description: 'Used for splicing lines of similar size. Not recommended for use in spectra connections.', howtoUrl: '/images/knots/Blood.png'});
var biminiTwist = new Knot({name: 'Bimini Twist Knot', description: 'Tied to form a double line. Can be tied short for bait fishing large tuna to provide for extra abrasion resistance at the gill plate. Also tied as a shock leader for big game trolling and for loop to loop spectra or wind on connections.', howtoUrl: '/images/knots/BiminiTwist.png'});
var dropperLoop = new Knot({name: 'Dropper Loop Knot', description: 'Used to tie a loop in the line above the sinker, or for tying a gangion of hooks. You can also cut one side of the finished loop to use only a single line to your hook.', howtoUrl: '/images/knots/DropperLoop.png'});
var improvedClinch = new Knot({name: 'Improved Clinch Knot', description: 'Very popular general purpose knot for attaching a swivel or hook to the end of a line. Line can be doubled before tying the knot for improved strength.', howtoUrl: '/images/knots/ImprovedClinch.png'});
var offshoreSwivel = new Knot({name: 'Offshore Swivel Knot', description: 'Tied to connect a swivel to the end of a double line.', howtoUrl: '/images/knots/OffshoreSwivel.png'});
var palomar = new Knot({name: 'Palomar Knot', description: 'Excellent high strength knot for attaching a hook or lure.', howtoUrl: '/images/knots/Palomar.png'});
var perfectionLoop = new Knot({name: 'Perfection Loop Knot', description: 'Tied to allow a free swinging hook connection, to space the hook back in a trolling lure, or to tie a loop in the end of a line. Popular knot used by Mexican cruiser and panga fisherman. Sometime referred to as the Mexican loop knot. Can be tied in heavy monofilament leader too. Can be used to attach a lure that needs a free connection, like using a leadhead on a swimbait.', howtoUrl: '/images/knots/PerfectionLoop.png'});
var snell = new Knot({name: 'Snell Knot', description: 'Snell knot is used for a solid connection to your hook. Also used to tie a double rig for halibut fishing. In step 2, make sure the wraps lay parallel to each other and do not cross over.', howtoUrl: '/images/knots/Snell.png'});
var sanDiego = new Knot({name: 'San Diego Knot', description: 'San Diego jamb knot made popular by the long range fleet. High strength knot for attaching a hook, swivel or lure to your line. Line can be doubled before tying to increase strength in heavier lines.', howtoUrl: '/images/knots/SanDiego.png'});
var spiderHitch = new Knot({name: 'Spider Hitch Knot', description: 'Spider Hitch knot is used to tie a double line or dropper loop. Good quick knot to tie a double line. Not recommended for use in spectra lines. For a high strength dropper loop use this knot and tie the sinker on the tag end. In step 3 be sure to pull the loop so the turns come off your finger in order.', howtoUrl: '/images/knots/SpiderHitch.png'});
var surgeon = new Knot({name: 'Surgeon’s Knot', description: 'Surgeon’s Knot is used for connecting two different diameter lines.', howtoUrl: '/images/knots/Surgeon.png'});
var trilene = new Knot({name: 'Trilene Knot', description: 'The Trilene knot is a multi purpose fishing knot that can be used for attaching monofilament line to hooks, swivels and lures.', howtoUrl: '/images/knots/Trilene.png'});
var uni = new Knot({name: 'Uni Knot', description: 'Uni knot, a very strong multi purpose knot for attaching a hook, swivel or lure. Can also be tied back to back to connect similar size lines, or spectra to monofilament line. If you want to keep a loop so your lure or hook remains free swinging, adjust your loop in step three, then snug up on the tag end. The knot will then pull down under the pressure of fighting a fish. With a little practice this knot can be tied in the dark, making it even more versatile.', howtoUrl: '/images/knots/Uni.png'});
var doubleUni = new Knot({name: 'Double Uni Knot', description: 'Awesome knot for connecting two lines of similar diameter. Can be used to connect spectra to mono also. It is recommended to tie a double in the Spectra before tying the knot if the diameters are very different.', howtoUrl: '/images/knots/DoubleUni.png'});

var allKnots = [albright, blood, biminiTwist, dropperLoop, improvedClinch, offshoreSwivel, palomar, perfectionLoop, snell, sanDiego, spiderHitch, surgeon, trilene, uni, doubleUni];

// Save it to database
Knot.collection.insert(allKnots, onInsert);
function onInsert(err, docs) {
    if (err) {
        console.log(err);
    } else {
        console.info('%d Knots were successfully stored.', docs.length);
    }
}
