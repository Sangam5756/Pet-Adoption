import AnimalCard from './AnimalCard';

const AnimalList = ({animals}) => {

  console.log(animals)
  return (
    <div className="grid  grid-cols-1 lg:grid-cols-4">
      {animals.map((animal) => (
        <AnimalCard key={animal._id} animalid ={animal._id} animal={animal} />
      ))}
    </div>
  );
};

export default AnimalList;
