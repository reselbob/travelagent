const seedAirline = async  () => {    const  {seedInventoryItems,seedReservations} = require('../../../airline/utilties/seeder')    await  seedInventoryItems();    await  seedReservations();}const seedHotel = async () => {    const  {seedInventoryItems,seedReservations} = require('../../../hotel/utilities/seeder');    await  seedInventoryItems();    await  seedReservations();}const seedAutos = async () => {    const  {seedInventoryItems,seedReservations} = require('../../../auto/utilties/seeder');    await  seedInventoryItems();    await  seedReservations();}const seedUsers =async  () => {    const  {seedUsers} = require('../../../users/utilties/seeder');    await seedUsers();}module.exports = {seedAirline,seedHotel, seedAutos, seedUsers}