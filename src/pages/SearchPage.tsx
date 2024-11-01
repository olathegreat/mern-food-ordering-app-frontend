import { useSearchRestaurants } from "@/api/RestaurantApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom"

export type SearchState = {
  searchQuery: string;
  page: number

}


function SearchPage() {
    const {city} = useParams(); 
    const [searchState, setSearchState] = useState<SearchState>({

     searchQuery: "",
     page: 1
    })

    const {results, isLoading} = useSearchRestaurants(searchState, city);

     if(isLoading) return <span>Loading...</span>
    if(!results?.data || !city) return <span>No results found</span>;  


     const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState)=>({
             ...prevState,
             searchQuery: searchFormData.searchQuery,
             page: 1,
        }))
     }

     const resetSearch = () =>{
       setSearchState((prevState)=>({
             ...prevState,
             searchQuery: "",
             page:1, 
        }))
     }

     const setPage = (page:number) =>{
      setSearchState((prevState)=>({
           ...prevState,
           page
      }))

     }

  return (
   <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">

    <div id="cuisines-list">
        insert cuisines list here:
    </div>  

    <div id="main-content" className="flex flex-col gap-5">
      <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeholder="Search by cuisine or restaurant name" onReset={resetSearch}/>
      <SearchResultInfo total={results?.pagination.total} city={city} /> 
       {
        results.data.map((restaurant)=>(
             <SearchResultCard restaurant={restaurant}/>
        ))
       }

       <PaginationSelector page={results.pagination.page} onPageChange={setPage} pages={results.pagination.pages}/>
    </div>

   </div>
  )
}

export default SearchPage
