import BikeCard from "@/components/Bike/BikeCard";
import Loading from "@/components/Shared/Loading";
import { useGetAllBikesQuery } from "@/redux/features/bike/bikeApi";
import { TBike } from "@/types";

const ManageBike = () => {
  const { data, isLoading, error } = useGetAllBikesQuery(undefined);


  if (isLoading) return <Loading message="Loading" />
  if (error) return <Loading message="Some Error Occured" />;


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

export default ManageBike;