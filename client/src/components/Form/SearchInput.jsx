import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchProduct } from "../../redux/slices/searchSlice";
import { useDispatch } from "react-redux";
const SearchInput = () => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery == " ") return
        const response = await dispatch(searchProduct(searchQuery));
        console.log(response)
        if (response?.payload?.length > 1) {
            navigate("/search")
        }
    };
    return (
        <div>
            <form className="d-flex" role="search">
                <input
                    className="input-search me-2"
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="button-search text-center" onClick={handleSearch}>Search</button>
            </form>
        </div>
    );
};

export default SearchInput;