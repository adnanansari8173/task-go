import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [deleteId, setDeleteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editId, setEditId] = useState(null);

  const addMessage = () => {
    if (!title) {
      toast.error("title can not be empty");
      return;
    }
    if (!desc) {
      toast.error("description can not be empty");
      return;
    }
    setTasks([...tasks, { id: uuid(), title: title, desc: desc }]);
    setTitle("");
    setDesc("");
    toast.success("Task added successfully");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      addMessage();
    }
  };
  const deleteMessage = () => {
    const newTasks = tasks.filter((message) => message.id !== deleteId);
    setTasks(newTasks);
    setDeleteId(null);
    toast.success("Task deleted successfully");
  };

  const updateMessage = () => {
    if (!editTitle) {
      toast.error("title cannot be empty");
      return;
    }
    if (!editDesc) {
      toast.error("Description cannot be empty");
      return;
    }

    const updatedTasks = tasks.map((message) => {
      if (message.id === editId) {
        return { ...message, title: editTitle, desc: editDesc };
      } else {
        return message;
      }
    });

    setTasks(updatedTasks);
    setEditId(null);
    toast.success("task updated successfully");
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <div className="h-screen bg-background text-foreground pt-20 px-5 overflow-y-auto">
        <div className=" max-w-[400px] mx-auto">
          <div className=" text-center">
            <h1 className="text-3xl mb-8 font-bold uppercase tracking-widest">
              Task <span className="text-primary">Go</span>
            </h1>
          </div>
          <div className="flex  gap-2 mb-8">
            <div>
              <input
                type="text"
                className="w-full bg-card border border-primary rounded px-[14px] py-[7px] outline-none mb-[6px] h-8 text-[14px]"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyUp={handleEnter}
              />
              <input
                type="text"
                className="w-full bg-card border border-primary rounded px-[14px] py-[7px] outline-none h-8 text-[14px] "
                placeholder="Description..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                onKeyUp={handleEnter}
              />
            </div>
            <button className="flex justify-center items-center w-[70px] h-[70px] border-2 shrink-0 rounded-md border-primary text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={addMessage}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          {tasks.length > 0 ? (
            [...tasks].reverse().map((item) => (
              <div
                key={item.id}
                className="flex justify-between bg-card p-4 mb-4 gap-4 rounded-md border-2 border-secondary"
              >
                <div>
                  <h4 className="text-[22px] font-medium">{item.title}</h4>
                  <p>{item.desc}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="text-primary border-2 rounded p-1 flex  justify-center items-center  border-secondary w-6 h-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => {
                      setEditId(item.id);
                      setEditTitle(item.title);
                      setEditDesc(item.desc);
                    }}
                    className="text-primary border-2 rounded p-1 flex justify-center items-center  border-secondary w-6 h-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                </div>

                {/* update section start */}

                {editId ? (
                  <div className="flex justify-center items-center h-screen w-screen bg-[#070707]/[0.89] fixed top-0 left-0 z-10 p-10">
                    <div className="flex w-full max-w-[360px] flex-col gap-2 bg-background  border-t-4 border-secondary rounded-b p-4">
                      <input
                        type="text"
                        className="bg-[#1B1A17] w-full border px-3 py-1 border-secondary rounded outline-none"
                        placeholder="Title..."
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <textarea
                        className="bg-[#1B1A17]  border px-3 py-1 w-full border-secondary rounded outline-none"
                        rows="8"
                        placeholder="Description..."
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                      ></textarea>
                      <div className="flex justify-center items-center gap-3 mt-2">
                        <button
                          onClick={() => setEditId(null)}
                          className="border rounded border-secondary px-2 py-1"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={updateMessage}
                          className="border rounded border-secondary px-3 py-1"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* update section end */}

                {deleteId ? (
                  <div className="flex justify-center items-center h-screen bg-[#070707]/[0.89] fixed top-0 left-0 z-10 w-screen">
                    <div className="bg-card flex justify-center flex-col items-center gap-6 w-[281px] h-[143px] border-t-4 border-secondary rounded-b">
                      <p>Delete this task?</p>
                      <div className="flex gap-3">
                        <button
                          onClick={deleteMessage}
                          className="py-0.5 px-4 border border-secondary rounded text-[14px]"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteId(false)}
                          className="py-0.5 px-4 border border-secondary rounded text-[14px]"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-16 h-[3px] bg-primary"></div>
              <p>No tasks</p>
              <div className="w-16 h-[3px] bg-primary"></div>
            </div>
          )}
        </div>
        <ToastContainer position="bottom-right" theme="dark" autoClose={1000} />
        <div className="fixed flex gap-4  transition-all top-6 md:top-10 right-10 md:right-20">
          <a
            href="https://github.com/adnanansari8173/task-go"
            target="_blank"
            rel="noreferrer"
            className="flex w-6 text-white/40 hover:text-primary"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/itsadnan/"
            className="flex w-6 text-white/40 hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <title>LinkedIn</title>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default App;
