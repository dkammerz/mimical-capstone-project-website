import React from "react";
import Image from "next/image";
import Link from "next/link";
import facebook from "../../public/facebook.svg";
import instagram from "../../public/instagram.svg";
import linkedin from "../../public/linkedin.svg";

const footer = () => {
  return (
    <div className="grid place-items-end fixed bottom-0 right-0 min-h-screen">
      <div className="flex mb-5 mr-5">
        <Link href="https://www.facebook.com/DiedreiFragezeichen">
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

        <Link href="https://www.instagram.com/drayz01/?hl=de">
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

        <Link href="https://www.linkedin.com/in/bernd-irlenbusch-7a6943113?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAABxv-K4B8ys1RmBeHFv2gPD6vKcbgRlxwC8&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BGFBBPrxURHu9Sn2%2F%2FNmB6Q%3D%3D">
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
