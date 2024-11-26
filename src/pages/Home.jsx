import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Home() {
  const [isModelOpen, setisModelOpen] = useState(false);
  const [filterNotes, setfilterNotes] = useState([]); 
  const [notes, setNotes] = useState([]); 
  const [currentNotes, setCurrentNotes] = useState(null);
  const [query, setQuery] = useState(""); 

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
    );
    setfilterNotes(filtered);
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("https://daily-task-app-b1cv.onrender.com/api/note",  {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setNotes(data.notes);
      setfilterNotes(data.notes); 
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const closeModal = () => {
    setCurrentNotes(null);
    setisModelOpen(false);
  };

  const onEdit = (note) => {
    setCurrentNotes(note);
    setisModelOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "https://daily-task-app-b1cv.onrender.com/api/note/add",
        { title, description },
        config
      );
      if (response.data.success) {
        toast.success("Note Added Successfully")
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `https://daily-task-app-b1cv.onrender.com/api/note/${id}`,
        { title, description },
        config
      );
      if (response.data.success) {
        toast.success("Updated Successfully")
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `https://daily-task-app-b1cv.onrender.com/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      if (response.data.success) {
        toast.success("Note Deleted")
        fetchNotes();


      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filterNotes.length > 0 ? (
          filterNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
            />
          ))
        ) : (
          <p>No Notes Found</p>
        )}
      </div>
      <button
        onClick={() => setisModelOpen(true)}
        className="fixed right-4 bottom-4 text-xl bg-teal-500 text-white font-bold p-4 rounded-full"
      >
        +
      </button>
      {isModelOpen && (
        <NoteModel
          closeModal={closeModal}
          addNote={addNote}
          currentNotes={currentNotes}
          editNote={editNote}
        />
      )}
    </div>
  );
}

export default Home;
