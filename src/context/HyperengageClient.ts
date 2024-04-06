import { HyperengageClient } from "@hyperengage/sdk-js";
import { createContext, useEffect } from "react";

const HyperengageContext = createContext<HyperengageClient | null>(null);

export default HyperengageContext;