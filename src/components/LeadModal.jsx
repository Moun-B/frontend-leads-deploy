import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const LeadModal = ({ active, handleModal, token, id, setErrorMessage }) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const getLead = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/api/leads/${id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Couldn't get the lead");
      } else {
        const data = await response.json();
        setName(data.name);
        setCompany(data.company);
        setEmail(data.email);
        setNote(data.note);
      }
    };

    if (id) {
      getLead();
    }
  }, [id, token]);

  const cleanFormData = () => {
    setName("");
    setCompany("");
    setEmail("");
    setNote("");
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: name,
        company: company,
        email: email,
        note: note,
      }),
    };
    if (id) {
      const response = await fetch(`/api/leads/${id}`, requestOptions);
      if (!response.ok) {
        setErrorMessage("Couldn't update the lead");
      } else {
        cleanFormData();
        handleModal();
      }
    } else {
      const response = await fetch(`/api/leads`, requestOptions);
      if (!response.ok) {
        setErrorMessage("Cannot create the Lead");
      } else {
        cleanFormData();
        handleModal();
      }
    }
  };

  const handleUpdateLead = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: name,
        company: company,
        email: email,
        note: note,
      }),
    };
    const response = await fetch(`/api/leads/${id}`, requestOptions);

    if (!response.ok) {
      setErrorMessage("Couldn't update the lead");
    } else {
      cleanFormData();
      handleModal();
    }
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-link-light">
          <h1 className="modal-card-title">
            {id ? "Update Lead" : "Create Lead"}
          </h1>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleCreateLead}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Company</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Note</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <footer className="modal-card-foot has-background-link-light">
              {id ? (
                <button type="submit" className="button is-info">
                  Update
                </button>
              ) : (
                <button type="submit" className="button is-link">
                  Create
                </button>
              )}
              <input
                type="button"
                value="Cancel"
                className="button"
                onClick={handleModal}
              ></input>
            </footer>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LeadModal;
