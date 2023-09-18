/** createContext()를 사용하여 firebase에서 제공하는 User객체 넘겨주기 위함 */

import React from "react";
import {User} from "@firebase/auth";

export const AuthContext = React.createContext<User | null>(null);
