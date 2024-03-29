import React, { useState } from "react";
import { StyleSheet, ActivityIndicator, Alert } from "react-native";
import * as Yup from "yup";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

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
import {
  collection,
  firestore,
  addDoc,
  serverTimestamp,
  getDoc,
  updateDoc
} from "../firebase/Config";
import colors from "../config/colors";


const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
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
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const uploadImagesToStorage = async (images, id) => {
    const imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageUrl = await uploadImageAsync(image, id, i);
      imageUrls.push(imageUrl);
    }

    return imageUrls;
  };

  const uploadImageAsync = async (uri, id, index) => {
    try {
      const buffer = await urlToBuffer(uri);
      const timestamp = new Date().getTime();
      const fileExtension = uri.split(".").pop();

      const fileName = `${timestamp}_${index}.${fileExtension}`;
      const fileRef = ref(getStorage(), `ilmoitukset/${id}/${fileName}`);
      await uploadBytes(fileRef, buffer);

      return fileName;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const urlToBuffer = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const addReport = async (reportinfo, { resetForm }) => {
    try {
      setLoading(true);

      // Add document to Firestore and get its ID
      const addedDocRef = await addDoc(collection(firestore, "ilmoitukset"), {
        created: serverTimestamp(),
        categoryId: reportinfo.category.value,
        price: reportinfo.price,
        title: reportinfo.title,
        description: reportinfo.description,
        images: reportinfo.images,
      });

      const addedDocSnapshot = await getDoc(addedDocRef);

      if (addedDocSnapshot.exists()) {
        if (reportinfo.images.length > 0) {
          const imageUrls = await uploadImagesToStorage(
            reportinfo.images,
            addedDocSnapshot.id
          );

          // Update Firestore document with image URLs
          await updateDoc(addedDocRef, {
            images: imageUrls,
          });
        }

        Alert.alert("Sending was successful", "Form sent successfully.");
      } else {
        Alert.alert("Error", "Form submission failed, please try again.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred, please try again.");
    } finally {
      setLoading(false);
      resetForm();
    }
    console.log("Form data", reportinfo);
  };

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={addReport}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <Picker
          items={categories}
          name="category"
          placeholder="Category"
          width="50%"
          PickerItemComponent={CategoryPickerItem}
          numberOfColumns={3}
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
        {loading && (
          <ActivityIndicator
            size="large"
            animating={true}
            color={colors.primary}
          />
        )}
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