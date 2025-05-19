const agentValidate = (form) => {
   const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.mobile.trim() || !/^\+\d{1,3}\d{7,14}$/.test(form.mobile))
      errs.mobile = "Mobile must include country code e.g. +1234567890";
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    return errs;
};
export default agentValidate;