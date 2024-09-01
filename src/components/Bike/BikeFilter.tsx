import React, { useState } from 'react';
import { useGetAllBikesQuery } from '@/redux/features/bike/bikeApi';
import { TBike, TFilterProps, TFilterState } from '@/types';
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from 'lucide-react'
import BikeCard from './BikeCard';
import { Button } from "@/components/ui/button"



const ITEMS_PER_PAGE = 6;

const BikeFilter: React.FC<TFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<TFilterState>({
    brand: '',
    model: '',
    isAvailable: null,
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetAllBikesQuery(undefined);
  const bikes: TBike[] = data?.data || [];

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (isError) return <div className="text-center py-4 text-red-500">Something went wrong. Please try again later.</div>;

  const brands = Array.from(new Set(bikes.map((bike) => bike.brand)));

  const getModels = (brand: string) => {
    if (brand) {
      return Array.from(new Set(bikes.filter(bike => bike.brand === brand).map(bike => bike.model)));
    }
    return Array.from(new Set(bikes.map((bike) => bike.model)));
  };

  const models = getModels(filters.brand);

  const filteredBikes = bikes.filter(bike => {
    const searchLower = filters.search.toLowerCase();
    const matchesSearch =
      bike.name.toLowerCase().includes(searchLower) ||
      bike.brand.toLowerCase().includes(searchLower) ||
      bike.model.toLowerCase().includes(searchLower);

    return (
      matchesSearch &&
      (filters.brand === '' || bike.brand === filters.brand) &&
      (filters.model === '' || bike.model === filters.model) &&
      (filters.isAvailable === null || bike.isAvailable === filters.isAvailable)
    );
  });

  const totalPages = Math.ceil(filteredBikes.length / ITEMS_PER_PAGE);
  const paginatedBikes = filteredBikes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
      search: ''
    };
    if (name === 'isAvailable') {
      newFilters.isAvailable = value === '' ? null : value === 'true';
    }
    if (name === 'brand') {
      newFilters.model = '';
    }
    setFilters(newFilters);
    setCurrentPage(1);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newFilters = {
      ...filters,
      search: value,
      brand: '',
      model: '',
      isAvailable: null
    };
    setFilters(newFilters);
    setCurrentPage(1);
    onFilterChange(newFilters);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full max-w-6xl new-amsterdam-regular mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-5xl text-black text font-light text-center">Filter Bikes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4" />
              <Input
                type="text"
                name="search"
                placeholder="Search bikes..."
                className="pl-8 py-3 text-3xl text-black"
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                className="w-full text-2xl p-2 border text-black rounded"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                name="model"
                value={filters.model}
                onChange={handleFilterChange}
                className="w-full p-2 text-2xl text-black border rounded"
              >
                <option value="">All Models</option>
                {models.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>

              <select
                name="isAvailable"
                value={filters.isAvailable?.toString() ?? ''}
                onChange={handleFilterChange}
                className="w-full p-2 text-2xl text-black border rounded"
              >
                <option value="">All Availability</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredBikes.length === 0 && (filters.brand || filters.model || filters.isAvailable !== null || filters.search) && (
        <div className="text-center text-2xl md:text-5xl mt-4 text-red-500">
          😭😭 No bikes match the selected filters
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedBikes.map((bike) => (
          <BikeCard key={bike._id} bike={bike} status='view' />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span className="text-xl">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default BikeFilter;