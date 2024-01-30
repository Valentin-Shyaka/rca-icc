import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/cms/schemas";
import { visionTool } from "@sanity/vision";

export default defineConfig({
  basePath: "/studio",
  name: "rca-icc",
  title: "RCA interclass competitions CMS",
  projectId: "lxeru4rg",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
