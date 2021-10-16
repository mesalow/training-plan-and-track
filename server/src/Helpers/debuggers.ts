import {debug } from "debug"

const appDebug = debug("app");
const domainDebug = debug("domain");
const infraStructureDebug = debug("infra");

export { appDebug, domainDebug, infraStructureDebug }