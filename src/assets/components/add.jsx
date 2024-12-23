import React, { useState } from "react";
import "../css/add.css";

const Add = () => {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [notes, setNotes] = useState([]); // Store notes as an array of files

    const handleNameChange = (e) => setName(e.target.value);
    const handleStatusChange = (e) => setStatus(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleNotesChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNotes((prevNotes) => [...prevNotes, file]); // Add file to the notes list
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting:", { name, status, category, notes });
        setName("");
        setStatus("");
        setCategory("");
        setImage(null);
        setNotes([]);
    };

    const handleClear = () => {
        setName("");
        setStatus("");
        setCategory("");
        setImage(null);
        setNotes([]);
    };

    return (
        <div className="addCard">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <div className="left">
                        <label>
                            <b>Name:</b>
                            <input type="text" value={name} onChange={handleNameChange} required />
                        </label>
                        <label>
                            <b>Status:</b>
                            <select value={status} onChange={handleStatusChange} required>
                                <option value="" disabled>
                                    Select Status
                                </option>
                                <option value="completed">Completed</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="in-future">In Future</option>
                            </select>
                        </label>

                        <label>
                            <b>Category:</b>
                            <input type="text" value={category} onChange={handleCategoryChange} required />
                        </label>
                    </div>
                    <div className="right">
                        <label htmlFor="file-upload" className="upload-button">
                            {image ? (
                                <img src={image} alt="Uploaded preview" className="image-preview" />
                            ) : (
                                <span>+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />
                    </div>

                </div>

                <div className="notes-upload">
                    {notes.map((note, index) => (
                        <div key={index} className="notes-item">
                            <span className="notes-filename">{note.name}</span>
                        </div>
                    ))}

                    <label>
                        <input
                            type="file"
                            id="notes-upload"
                            accept="application/pdf"
                            onChange={handleNotesChange}
                            style={{ display: "none" }}
                        />
                        <label htmlFor="notes-upload" className="notes-upload-button">
                            <span>+</span>
                        </label>
                    </label>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;