import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Zyncet Cetrizine 10Mg X50',
      price: 2450,
      quantity: 2,
      image: 'https://healthplusnigeria.com/cdn/shop/files/Goodseed_20Fertility_20for_20Men_20Capsules_20x90_88c1ea28-f5dd-48b9-a95f-45837164f4fb.webp?v=1750245883&width=800',
      prescription: false,
      inStock: true
    },
    {
      id: '2',
      name: 'Paracetamol 500mg Tablets',
      price: 850,
      quantity: 1,
      image: 'https://healthplusnigeria.com/cdn/shop/files/Fiesta_20Intim_20Natural_20Gel_20Lubricant_2070ml_2fd8c1ab-123d-480c-bc76-ea299b2f3d42.webp?v=1744729044&width=800',
      prescription: false,
      inStock: true
    },
    {
      id: '3',
      name: 'Amoxicillin 250mg Capsules',
      price: 3200,
      quantity: 1,
      image: 'https://healthplusnigeria.com/cdn/shop/files/Evergreen_20Formular_20for_20Women_20x90_6917644f-ea80-4895-b88d-22d0db96a3c9.webp?v=1744729040&width=800',
      prescription: true,
      inStock: true
    }
  ]);

  const [selectedDelivery, setSelectedDelivery] = useState('express');
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  const deliveryOptions = [
    {
      id: 'express',
      name: 'Express Delivery',
      time: '20-30 mins',
      price: 500,
      icon: 'flash'
    },
    {
      id: 'standard',
      name: 'Standard Delivery',
      time: '1-2 hours',
      price: 200,
      icon: 'time'
    },
    {
      id: 'pickup',
      name: 'Store Pickup',
      time: 'Ready in 15 mins',
      price: 0,
      icon: 'location'
    }
  ];

  const updateQuantity = (id, change) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => {
          setCartItems(prev => prev.filter(item => item.id !== id));
        }}
      ]
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryOptions.find(opt => opt.id === selectedDelivery)?.price || 0;
  const discount = promoCode === 'SAVE10' ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee - discount;

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const applyPromoCode = () => {
    if (promoCode === 'SAVE10') {
      Alert.alert('Success', '10% discount applied!');
    } else if (promoCode) {
      Alert.alert('Invalid Code', 'Please enter a valid promo code');
      setPromoCode('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="bag" size={20} color="white" />
              </View>
              <Text style={styles.headerTitle}>Cart</Text>
            </View>
          </View>
        </View>

        {/* Cart Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cart Items ({cartItems.length})</Text>
          
          {cartItems.length === 0 ? (
            <View style={styles.emptyCart}>
              <View style={styles.emptyCartIcon}>
                <Ionicons name="bag-outline" size={32} color="#9CA3AF" />
              </View>
              <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
              <Text style={styles.emptyCartText}>Add some medicines to get started</Text>
            </View>
          ) : (
            <View style={styles.cartItems}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemImageContainer}>
                      <Image source={{ uri: item.image }} style={styles.itemImage} />
                    </View>
                    
                    <View style={styles.itemInfo}>
                      <View style={styles.itemNameRow}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <TouchableOpacity
                          onPress={() => removeItem(item.id)}
                          style={styles.removeButton}
                        >
                          <Ionicons name="close" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                      </View>
                      
                      <Text style={styles.itemPrice}>
                        {formatCurrency(item.price)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.itemFooter}>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, -1)}
                        style={[styles.quantityButton, styles.decreaseButton]}
                        disabled={item.quantity <= 1}
                      >
                        <Ionicons name="remove" size={16} color="#6B7280" />
                      </TouchableOpacity>
                      
                      <View style={styles.quantityDisplay}>
                        <Text style={styles.quantityLabel}>Qty</Text>
                        <Text style={styles.quantityValue}>{item.quantity}</Text>
                      </View>
                      
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, 1)}
                        style={[styles.quantityButton, styles.increaseButton]}
                        disabled={!item.inStock}
                      >
                        <Ionicons name="add" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.itemTotal}>
                      <Text style={styles.itemTotalLabel}>Item Total</Text>
                      <Text style={styles.itemTotalValue}>
                        {formatCurrency(item.price * item.quantity)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Delivery Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Options</Text>
          <View style={styles.deliveryOptions}>
            {deliveryOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => setSelectedDelivery(option.id)}
                style={[
                  styles.deliveryOption,
                  selectedDelivery === option.id && styles.selectedDeliveryOption
                ]}
              >
                <View style={styles.deliveryOptionContent}>
                  <View style={styles.deliveryOptionLeft}>
                    <View style={styles.radioButton}>
                      {selectedDelivery === option.id && (
                        <View style={styles.radioButtonSelected} />
                      )}
                    </View>
                    <View style={styles.deliveryIcon}>
                      <Ionicons name={option.icon} size={20} color="#059669" />
                    </View>
                    <View style={styles.deliveryInfo}>
                      <Text style={styles.deliveryName}>{option.name}</Text>
                      <Text style={styles.deliveryTime}>{option.time}</Text>
                    </View>
                  </View>
                  <Text style={styles.deliveryPrice}>
                    {option.price === 0 ? 'Free' : formatCurrency(option.price)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promo Code */}
        <View style={styles.section}>
          <View style={styles.promoSection}>
            {!showPromoInput ? (
              <TouchableOpacity 
                onPress={() => setShowPromoInput(true)}
                style={styles.promoButton}
              >
                <Text style={styles.promoButtonText}>+ Add promo code</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.promoInput}>
                <TextInput
                  style={styles.promoTextInput}
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChangeText={setPromoCode}
                />
                <TouchableOpacity 
                  onPress={applyPromoCode}
                  style={styles.applyButton}
                >
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            )}
            {promoCode === 'SAVE10' && (
              <Text style={styles.promoSuccess}>✓ 10% discount applied!</Text>
            )}
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <View style={styles.orderSummary}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>{formatCurrency(deliveryFee)}</Text>
            </View>
            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, styles.discountText]}>Discount</Text>
                <Text style={[styles.summaryValue, styles.discountText]}>
                  -{formatCurrency(discount)}
                </Text>
              </View>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
            </View>
          </View>
        </View>

        {/* Checkout Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.checkoutButton}>
            <Ionicons name="card" size={20} color="white" />
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
          
          <View style={styles.securityInfo}>
            <Ionicons name="shield-checkmark" size={16} color="#6B7280" />
            <Text style={styles.securityText}>
              Secure payment • Licensed pharmacy • 24/7 support
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginTop: 60,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#14B8A6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#111827',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  emptyCart: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  emptyCartIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#F3F4F6',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyCartTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  emptyCartText: {
    fontSize: 14,
    color: '#6B7280',

  },
  cartItems: {
    gap: 12,
  },
  cartItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  itemImageContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: 56,
    height: 56,
    borderRadius: 4,
  },
  itemInfo: {
    flex: 1,
  },
  itemNameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
    borderRadius: 16,
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#059669',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decreaseButton: {
    backgroundColor: '#F3F4F6',
  },
  increaseButton: {
    backgroundColor: '#059669',
  },
  quantityDisplay: {
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Nunito-SemiBold',
  },
  quantityValue: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#111827',
    minWidth: 32,
    textAlign: 'center',
  },
  itemTotal: {
    alignItems: 'flex-end',
  },
  itemTotalLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Nunito-Regular',
  },
  itemTotalValue: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#059669',
  },
  deliveryOptions: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  deliveryOption: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
  },
  selectedDeliveryOption: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  deliveryOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#059669',
  },
  deliveryIcon: {
    marginRight: 4,
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryName: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#111827',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Nunito-Regular',
  },
  deliveryPrice: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#111827',
  },
  promoSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  promoButton: {
    alignItems: 'flex-start',
  },
  promoButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#059669',
  },
  promoInput: {
    flexDirection: 'row',
    gap: 8,
  },
  promoTextInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    fontSize: 16,
  },
  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#059669',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
  },
  promoSuccess: {
    fontSize: 14,
    color: '#059669',
    marginTop: 8,
  },
  orderSummary: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Nunito-Regular',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  discountText: {
    color: '#059669',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#111827',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
  },
  checkoutButton: {
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  securityText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Nunito-Regular',
  },
});

export default CartPage;