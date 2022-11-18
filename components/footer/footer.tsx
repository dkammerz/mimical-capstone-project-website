import React from "react";
import Image from "next/image";
import Link from "next/link";
import facebook from "../../public/facebook.svg";
import instagram from "../../public/instagram.svg";
import linkedin from "../../public/linkedin.svg";

// Usual footer as learned in previous lessons

const footer = () => {
  return (
    <div className="grid justify-items-end mt-10">
      <div className="flex mb-5 mr-5">
        <Link href="https://www.facebook.com/">
          <button>
            <Image
              className="mx-2"
              src={facebook}
              alt="facebook"
              width={40}
              height={40}
            />
          </button>
        </Link>

        <Link href="https://www.instagram.com/">
          <button>
            <Image
              className="mx-2"
              src={instagram}
              alt="instagram"
              width={40}
              height={40}
            />
          </button>
        </Link>

        <Link href="https://www.linkedin.com/">
          <button>
            <Image
              className="mx-2"
              src={linkedin}
              alt="linkedin"
              width={40}
              height={40}
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default footer;
