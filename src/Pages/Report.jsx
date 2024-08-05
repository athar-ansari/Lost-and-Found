import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../Components/ui/tabs";
import FoundItemsForm from "@/Components/Form/FoundItemsForm/FoundItemsForm";
import LostItemsForm from "@/Components/Form/LostItemsForm/LostItemsForm";

const Report = () => {
  return (
    <>
      <Tabs
        defaultValue="found"
        className="w-[385px] font-lora font-semibold  xs:w-[330px]"
      >
        <TabsList>
          <TabsTrigger value="found">Found Items</TabsTrigger>
          <TabsTrigger value="lost">Lost Items</TabsTrigger>
        </TabsList>
        <TabsContent value="found" className="mt-2 text-2xl  ">
          Report Found Items.
          <FoundItemsForm />
        </TabsContent>
        <TabsContent value="lost" className="mt-2 text-2xl  ">
          Report Lost Items.
          <LostItemsForm />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Report;
