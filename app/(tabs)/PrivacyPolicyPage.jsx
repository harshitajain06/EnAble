import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

const PrivacyPolicyPage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Privacy Policy</Text>

        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.text}>
          Welcome to EnAble. This Privacy Policy outlines how we collect, use, and protect your
          information when you use our app. By using EnAble, you agree to the practices described in
          this policy.
        </Text>

        <Text style={styles.sectionTitle}>2. Information We Collect</Text>
        <Text style={styles.text}>
          We collect only the minimum data necessary to provide and improve our services. This may
          include:
          {'\n'}• Name and contact details
          {'\n'}• Location data (for showing nearby accessible services)
          {'\n'}• Login credentials (email, password)
          {'\n'}• Preferences and feedback
        </Text>

        <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
        <Text style={styles.text}>
          Your data helps us personalize your experience and provide relevant content like accessible
          housing, transport, and care services. We never sell or share your information with third
          parties without your explicit consent.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.text}>
          We use secure servers, encrypted connections, and Firebase Authentication to keep your data
          safe. Despite our efforts, no online service is 100% secure, so we encourage you to protect
          your credentials.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.text}>
          You have the right to:
          {'\n'}• Access the data we store
          {'\n'}• Request data deletion (via Delete Account)
          {'\n'}• Withdraw consent at any time
        </Text>

        <Text style={styles.sectionTitle}>6. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or concerns about this policy, feel free to contact us at:{'\n'}
          <Text style={styles.email}>support@enableapp.org</Text>
        </Text>

        <Text style={styles.footer}>Last updated: July 6, 2025</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9', // White background for full screen
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Also ensure scrollView has white background
  },
  contentContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'android' ? 100 : 40, // Enough space for Android navbar
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#567396',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#345A7E',
    marginTop: 20,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#567396',
    lineHeight: 22,
  },
  email: {
    fontWeight: 'bold',
    color: '#345A7E',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 14,
    color: '#7895B2',
  },
});

export default PrivacyPolicyPage;
