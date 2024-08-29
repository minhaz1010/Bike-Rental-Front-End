import BikeCard from "@/components/Bike/BikeCard";
import { useGetAllBikesQuery } from "@/redux/features/bike/bikeApi";
import { TBike } from "@/types";

const DeleteBike = () => {
  const { data, isLoading, error } = useGetAllBikesQuery(undefined);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bikes</div>;


  const bikes: TBike[] = data?.data;
  return (
    <div>
      <div id="all-bike" className="container mt-5 mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-11">
        {
          bikes.map((bike) => <BikeCard key={bike._id} bike={bike} status="delete" />)
        }
      </div>
    </div>
  )

};

export default DeleteBike;