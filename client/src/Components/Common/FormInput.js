import React from "react";

const FormInput = ({ label, name, value, onValueChange, error, type }) => {
    const inputClass = error ? "error-input" : "";
    return (
        <div className="book-input">
            <h4>{label}</h4>
            <input
                name={name}
                type={type ? type : "text"}
                className={inputClass}
                placeholder={label}
                value={value}
                onChange={onValueChange}
            />
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default FormInput;
