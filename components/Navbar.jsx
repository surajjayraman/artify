"use client";
import { Menu, Person, Search, ShoppingCart } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import "@styles/Navbar.scss";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleLogOut = async () => {
    signOut({ callbackUrl: "/login" });
  };

  console.log(`user: ${JSON.stringify(user)}`);

  const searchWork = async () => {
    // e.preventDefault();
    if (query) {
      router.push(`/${query}`);
    }
  };

  const cart = user?.cart;

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>
      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton disabled={query === ""}>
          <Search sx={{ color: "red" }} onClick={searchWork} />
        </IconButton>
      </div>
      <div className="navbar_right">
        {user && (
          <a href="/cart" className="cart">
            <ShoppingCart sx={{ color: "grey" }} />
            Cart <span>({cart?.length})</span>
          </a>
        )}
        <button
          className="navbar_right_account"
          onClick={() => setDropDownMenu(!dropDownMenu)}
        >
          <Menu sx={{ color: "grey" }} />
          {!user ? (
            <Person sx={{ color: "grey" }} />
          ) : (
            <img
              src={user.profileImagePath}
              alt="profile"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>
        {dropDownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link href="/login">Log In </Link>
            <Link href="/register">Sign Up</Link>
          </div>
        )}
        {dropDownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/order">Order</Link>
            <Link href="/shop">Your Shop</Link>
            <Link href="/create-work">Sell Your Work</Link>
            <a onClick={handleLogOut}>Log Out</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
