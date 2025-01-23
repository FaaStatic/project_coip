import Realm from 'realm';

const status = (numberInput: number) => {
  switch (numberInput) {
    case 1:
      return {
        id: new Realm.BSON.ObjectID(),
        value: 1,
        color: '#E9445A',
        fontColor: 'white',
      };

    case 2:
      return {
        id: new Realm.BSON.ObjectID(),
        value: 2,
        color: '#FFB92E',
        fontColor: 'white',
      };

    case 3:
      return {
        id: new Realm.BSON.ObjectID(),
        value: 3,
        color: '#FFD500',
        fontColor: 'black',
      };
    case 4:
      return {
        id: new Realm.BSON.ObjectID(),
        value: 4,
        color: '#94E590',
        fontColor: 'white',
      };

    case 5:
      return {
        id: new Realm.BSON.ObjectID(),
        value: 5,
        color: '#59AD24',
        fontColor: 'white',
      };

    default:
      return {
        value: 1,
        color: '#E9445A',
        fontColor: 'white',
      };
  }
};

export const ConfigScoreUtil = (arrayScore: Array<number>) => {
  const list = [];
  arrayScore.map((item) => {
    const scoreSave = status(item);
    list.push(scoreSave);
  });
  return list;
};
