import React from "react";
import { Link } from "react-router";

function Header() {
  return (
    <header className="bg-teal-600 py-2">
      <div className="max-w-300 mx-auto">
        <nav>
          <div>
            <div>
              <h1 className="text-white text-3xl font-serif font-semibold">
                Proshanto
              </h1>
            </div>
            <div>
<Link to="/singin">Sing In</Link>


            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
