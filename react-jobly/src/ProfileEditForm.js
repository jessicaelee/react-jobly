import React, { useState } from 'react';
import Alert from './Alert'

function ProfileEditForm({ user, updateUser }) {
  const { username, first_name, last_name, email, photo_url } = user;
  const [alert, setAlert] = useState(null)
  const [form, setForm] = useState({
    username,
    first_name,
    last_name,
    email,
    photo_url: photo_url || "",
    password: ""
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm(fData => ({
      ...fData, [name]: value
    }));
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await updateUser(form);
      setAlert(<Alert type="success" messages={["User successfully updated."]} />);
      setForm(form => ({ ...form, password: "" }));
      setTimeout(() => setAlert(null), 4000);
    } catch (err) {
      setAlert(<Alert messages={err} />);
      setTimeout(() => setAlert(null), 4000);
    };
  };

  const updateForm = (
    <form className="Update-updateForm" onSubmit={handleSubmit}>
      <label className="font-weight-bold" htmlFor="username">Username</label>
      <p>{username}</p>

      <div className="form-group"><label className="font-weight-bold" htmlFor="first_name">First Name</label>
        <input className="form-control" id="first_name"
          name="first_name"
          type="text"
          required
          onChange={handleChange}
          value={form.first_name} /> </div>

      <div className="form-group"><label className="font-weight-bold" htmlFor="last_name">Last Name</label>
        <input className="form-control" id="last_name"
          name="last_name"
          type="text"
          required
          onChange={handleChange}
          value={form.last_name} /></div>

      <div className="form-group"><label className="font-weight-bold" htmlFor="email">Email</label>
        <input className="form-control" id="email"
          name="email"
          type="email"
          required
          onChange={handleChange}
          value={form.email} /></div>

      <div className="form-group"><label className="font-weight-bold" htmlFor="photo_url">Photo URL</label>
        <input className="form-control" id="photo_url"
          name="photo_url"
          type="text"
          onChange={handleChange}
          value={form.photo_url} /></div>

      <div className="form-group"><label className="font-weight-bold" htmlFor="password">Re-enter Password</label>
        <input className="form-control" id="password"
          name="password"
          type="password"
          required
          onChange={handleChange}
          value={form.password} /></div>

      <button type="submit" className="btn btn-primary">Save Changes</button>

    </form>
  )


  return (
    <div className="ProfileEditFrom pt-5">
      <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <h3>Profile</h3>
        <div className="card"><div className="card-body">
          {(alert) ? alert : ""}
          {updateForm}
        </div>
        </div>
      </div>
    </div>
  )

}

export default ProfileEditForm;