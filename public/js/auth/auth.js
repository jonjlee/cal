import * as model from "../model/model.js";

// Handles verifying that user is authenticated and authorized for department being
// accessed as specified by the URL query string.
//
// This class initiates backend requests on construction. The result is accessed
// using the Auth.auth promise. If authn/authz succeed, the promise returns the
// full { user, dept_id } being accessed.
//
// The promise will return an error if the user does not have the correct access.
// Auth.redirect will contain the href of the recommended location to redirect to.
//
export class Auth {
  constructor(currentPage, queryString) {
    this.currentPage = currentPage;

    const qp = new URLSearchParams(queryString);
    this.accessCode = qp.get("c");
    this.deptId = qp.get("d");
    this.user = null;

    this.auth = this._beginAuth();
    this.auth.redirect = "#";
  }

  async _beginAuth() {
    // Get the user data, fetch all fresh fields from DB
    this.user = await model.getUser(true);

    // Priority for department goes to query params above user settings. Check for dept_id first, then try access code
    if (this.user && this.deptId) {
      // Validate logged in user has access
      if (await model.hasDeptAccess(this.deptId)) {
        return { user: this.user, deptId: this.deptId };
      }
    }

    // Access code specified. Validate code and try to access department
    if (this.accessCode) {
      const res = await model.loginByAccessCode(this.accessCode);
      if (res.user && res.deptId != null) {
        this.user = res.user;
        this.deptId = res.deptId;
        return res;
      } else {
        // Access code was invalid, redirect to login
        this.auth.redirect = "./login.html";
        throw new Error("Invalid access code, redirect");
      }
    }

    if (this.user) {
      // No accessible dept ID or access code. If user logged in, redirect to first accessible dept
      // which will trigger reload
      const res = await model.getUserDepts();
      if (res.data?.length > 0) {
        this.auth.redirect = `./${this.currentPage}?d=${res.data[0].id}`;
        throw new Error("Invalid department, redirect");
      }

      // No accessible departments, redirect to departments page
      this.auth.redirect = "./dept.html";
      throw new Error("No departments, redirect");
    }

    // No user logged in. Redirect to login page.
    this.auth.redirect = "./login.html";
    throw new Error("User not authenticated, redirect");
  }
}
