import React from "react";

const CategoryForm = ({ onFormSubmit, value, setValue, icon, setIcon }) => {
    return (
        <>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new category"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        className="btn btn-outline-secondary col-md-12"
                        htmlFor="image"
                    >
                        {icon ? icon.name : "Upload Image"}
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setIcon(e.target.files[0])}
                            hidden

                        />
                    </label>
                </div>
                <div className="mb-3">
                    {icon && (
                        <div className="text-center">
                            <img src={URL.createObjectURL(icon)}
                                alt="product image"
                                height={"200px"}
                                className="img img-responsive"
                            />
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default CategoryForm;