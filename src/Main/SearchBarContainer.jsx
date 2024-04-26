import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import getUsers from '../utils/getUsers';
import { cacheSearch } from '../utils/SearchSlice';
import { Link } from 'react-router-dom';

const SearchBarContainer = () => {
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [searchText, setSearchText] = useState("");
    const { token } = useSelector(state => state.userDetails);
    const [userData, setUserData] = useState([]);
    const SearchCache = useSelector(state => state.search);
    const dispatch = useDispatch();

    const getuserData = async () => {
        const users = await getUsers(searchText, token);
        dispatch(cacheSearch({
            [searchText]: users
        }));
        setUserData(users);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (SearchCache[searchText]) {
                
                setUserData(SearchCache[searchText]);
            }
            else {
                getuserData();
            }
        }, 200)

        return () => clearTimeout(timer);


    }, [searchText])


    const handleClick = (e) => {
        setSearchText(e.target.textContent);
        setShowSuggestion(false);
    }

    return (
        <>
            <div className="search-bar">
                <IoIosSearch className="Search-icon" />
                <input type="text" placeholder="Search...." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="search-input" onClick={() => setShowSuggestion(true)} />
            </div>
            {showSuggestion && userData && userData.length > 0 && (
                <div className="suggestions">
                    <ul>
                        {userData.map((each) => (
                            <li key={each.id} onClick={(e) => handleClick(e)}><Link to={`/userprofile/${each._id}`} onClick={(e) => handleClick(e)} className="link-without-underline">{each.name}</Link></li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default SearchBarContainer
