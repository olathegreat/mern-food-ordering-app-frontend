import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

function SearchResultInfo({ total, city }: Props) {
  return (
    <div
      className="flex text-xl font-bold
     justify-between lg:items-center
      flex-col  lg:flex-row 
       gap-3"
    >
        <span>
            {total} Restaurants found in {city}

            <Link className="ml-2 text-sm text-blue-500 underline cursor-pointer font-semibold" to="/" >Change Location</Link>
        </span>

        insert sort dropdown here  
    </div>
  );
}

export default SearchResultInfo;
