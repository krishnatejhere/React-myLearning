import React, { useState } from 'react';
import '../css/card.css';

const Card = (props) => {
    const [liked, setLiked] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [editing, setEditing] = useState(false);
    const [details, setDetails] = useState({
        name: props.name,
        status: props.status,
        category: props.category,
        startDate: props.startDate,
        endDate: props.endDate,
        notes: props.notes,
        image: props.image,
        subtopics: props.subtopics || []
    });

    const toggleLike = (e) => {
        e.stopPropagation(); // Prevent expansion when clicking the like button
        setLiked(!liked);
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
        if (!expanded) {
            props.onExpand(props.id); // Notify parent to handle exclusive expansion
        }
    };

    const toggleEdit = () => {
        setEditing(!editing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value
        });
    };

    const handleSubtopicChange = (index, checked) => {
        const updatedSubtopics = [...details.subtopics];
        updatedSubtopics[index].completed = checked;
        setDetails({
            ...details,
            subtopics: updatedSubtopics
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDetails({
                ...details,
                image: URL.createObjectURL(file)
            });
        }
    };

    const handleAddSubtopic = () => {
        const newSubtopic = { title: '', completed: false };
        setDetails({
            ...details,
            subtopics: [...details.subtopics, newSubtopic]
        });
    };

    const handleEditSubtopic = (index, newTitle) => {
        const updatedSubtopics = [...details.subtopics];
        updatedSubtopics[index].title = newTitle;
        setDetails({
            ...details,
            subtopics: updatedSubtopics
        });
    };

    const handleDeleteSubtopic = (index) => {
        const updatedSubtopics = details.subtopics.filter((_, i) => i !== index);
        setDetails({
            ...details,
            subtopics: updatedSubtopics
        });
    };

    const saveChanges = () => {
        props.onSave(details); // Notify parent to save the changes
        setEditing(false); // Exit edit mode
    };

    return (
        <div 
                className={`card ${expanded ? 'expanded' : ''}`} 
                onMouseEnter={() => !editing && setExpanded(true)}
                onMouseLeave={() => !editing && setExpanded(false)}
        >

            <div className="default-card">
                <div className="details">
                    <label><b>Name :</b>
                        {editing ? (
                            <input
                                type="text"
                                name="name"
                                value={details.name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            details.name || 'Please enter'
                        )}
                    </label>
                    <label><b>Status :</b>
                        {editing ? (
                            <input
                                type="text"
                                name="status"
                                value={details.status}
                                onChange={handleInputChange}
                            />
                        ) : (
                            details.status || 'Please enter'
                        )}
                    </label>
                    <label><b>Category :</b>
                        {editing ? (
                            <input
                                type="text"
                                name="category"
                                value={details.category}
                                onChange={handleInputChange}
                            />
                        ) : (
                            details.category || 'Please enter'
                        )}
                    </label>
                </div>
                
                <div className="image-container">
                    <button
                        className="expand-button"
                        onClick={(e) => {
                            if (!editing) {
                                toggleExpand(); // Only toggle expansion if not in edit mode
                            }
                            e.stopPropagation(); // Prevent triggering card expansion when image is clicked
                        }}
                    >
                        <img
                            src={details.image}
                            alt="image"
                            id="logo"
                            className={editing ? 'image-editing' : ''}
                        />
                    </button>

                    {editing && (
                        <input
                            id="imageInput"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="image-input"
                        />
                    )}
                </div>


                <div className="buttons">

                    <div className="alter">
                        <button className={`like ${liked ? 'active' : ''}`} onClick={toggleLike}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>

                        <button className="edit" onClick={(e) => {
                            e.stopPropagation();
                            toggleEdit();
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" stroke="currentColor" strokeWidth="2" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                        </button>

                        <button className="delete" onClick={props.onDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor" d="M16 9v10H8V9h8m-1-6h-4l-1 1H5v2h14V4h-5l-1-1zM6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9H6v10z"/>
                            </svg>
                        </button>

                        {editing && (
                            <button className="save" onClick={saveChanges}>
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {expanded && (
                <div className="additional-details">
                    <label className="date"><b>Start Date:</b>
                        {editing ? (
                            <input
                                type="date"
                                name="startDate"
                                value={details.startDate}
                                onChange={handleInputChange}
                            />
                        ) : (
                            details.startDate || 'Please enter'
                        )}
                    </label>
                    <label className="date"><b>End Date:</b>
                        {editing ? (
                            <input
                                type="date"
                                name="endDate"
                                value={details.endDate}
                                onChange={handleInputChange}
                            />
                        ) : (
                            details.endDate || 'Please enter'
                        )}
                    </label>

                    <div className="notes">
                        <label><b>Notes:</b></label>
                        {editing ? (
                            <input
                                type="file"
                                name="notes"
                                multiple
                                onChange={(e) => handleInputChange(e)}
                            />
                        ) : (
                            <div>{details.notes || 'Please enter'}</div>
                        )}
                    </div>

                    <div className="subtopics">
                        <label><b>Subtopics:</b></label>
                        <ul className="checklist">
                            {details.subtopics.length ? (
                                details.subtopics.map((subtopic, index) => (
                                    <li key={index} className="subtopic">
                                        <input
                                            type="checkbox"
                                            checked={subtopic.completed}
                                            onChange={(e) => handleSubtopicChange(index, e.target.checked)}
                                            disabled={!editing}
                                        />
                                        {editing ? (
                                            <input
                                                type="text"
                                                value={subtopic.title}
                                                onChange={(e) => handleEditSubtopic(index, e.target.value)}
                                            />
                                        ) : (
                                            <span>{subtopic.title || 'Please enter'}</span>
                                        )}
                                        {editing && (
                                            <button onClick={() => handleDeleteSubtopic(index)}>
                                                Delete
                                            </button>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>Please enter</li>
                            )}
                        </ul>
                        {editing && (
                            <button onClick={handleAddSubtopic}>Add Subtopic</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
