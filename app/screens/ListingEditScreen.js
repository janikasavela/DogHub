import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image.")
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "bowl",
    label: "Food",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "basket",
    label: "Treats",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "car",
    label: "Transport",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "water",
    label: "Trimming and care",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "dog-service",
    label: "Outdoor equipment",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Toys",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "whistle",
    label: "Training and hobbies",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "dog",
    label: "Clothing",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "dots-horizontal",
    label: "Other",
    value: 9,
  },
];

function ListingEditScreen() {

  const location = useLocation()

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: []
        }}
        onSubmit={(values) => console.log(location)}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images"/>
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <Picker items={categories} name="category" placeholder="Category" width="50%" PickerItemComponent={CategoryPickerItem} numberOfColumns={3}/>
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
