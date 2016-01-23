module.exports = (req, res) => {
  var dummydata = [
    {
      address: 11500,
      isOccupied: true,
      occupantName: 'David',
      street: 'Mackay',
      category: 'residence',
      notes: 'no big deal'
    },
    {
      address: 11503,
      isOccupied: false,
      street: 'Mackay',
      notes: 'looks like it used to be a pawn shop'
    },
    {
      address: 11502,
      isOccupied: false,
      street: 'Mackay'
    },
    {
      address: 11501,
      isOccupied: true,
      occupantName: 'Sal\'s Saloon',
      street: 'Mackay'
    }
  ];

  res.json(dummydata);
};
