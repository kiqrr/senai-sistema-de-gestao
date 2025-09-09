# TODO - Simplified Monetization Feature Implementation

## Step 1: Database Schema Updates
- [x] Add `price` field to events table for ticket pricing.
- [x] Create simplified `coupons` table for display purposes.

## Step 2: Remove Payment SDK Dependencies
- [x] Remove @stripe/stripe-js and @stripe/react-stripe-js from package.json.

## Step 3: Frontend Components
- [x] Update EventForm.js to include ticket price input.
- [x] Update Events.js to show ticket prices and handle simple registrations.
- [x] Remove PaymentForm.js, CouponInput.js, FinancialReports.js, CoOrganizerManagement.js.

## Step 4: Simplified Registration Flow
- [x] Button "Comprar" simply registers user and shows confirmation popup.
- [x] No real payment processing - just registration confirmation.

## Step 5: Cleanup
- [x] Remove unused payment-related files and functions.
- [x] Simplify database migrations to remove complex payment tables.
