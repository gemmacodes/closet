
import { createSearchParams, useSearchParams } from 'react-router-dom'

const queryString = "?categories=1,2,3&colors=2&seasons=3,4";
const sp = new URLSearchParams(queryString);

const categories = searchParams.get('categories')
const colors = searchParams.get('colors')
const seasons = searchParams.get('seasons')


//////////////////////


const Test = () => {
  const [searchParams, setSearchParams] = useSearchParams();

	function appendSearchParams(obj) {
      // setSearchParams({ categories: "1,2,3"  }); // https://somevalidurl.com?categories=1,2,3
		
		const sp = createSearchParams(searchParams);

		Object.entries(obj).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				sp.delete(key);
				value.forEach((v) => sp.append(key, v));
			} else if (value === undefined) {
				sp.delete(key);
			} else {
				sp.set(key, value);
			}
		});
		return sp;
	}

  return (
	<div>
		<input
			type="checkbox"
			id={`category:${category.id}`}
				key={category.id}
				value={category.id}
				onChange={(event) => {
				setSearchParams(
					appendSearchParams({ categoryId: event.target.value })
				);
			}}
		/>
  </div>)};


/////////////////////

const SearchPage = ({ match, location }) => {
return (
    <p>
    <strong>Location props / location Params: </strong>
    {location.search}
    </p>
);
};