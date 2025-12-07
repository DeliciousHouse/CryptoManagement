// Calculator Inputs
export interface CalculatorInputs {
  hashrate: number; // TH/s
  powerConsumption: number; // kW
  energyCost: number; // $/kWh
  btcPrice: number; // USD
  poolFee: number; // percentage (0-100)
}

// Profit Calculation Results
export interface ProfitResult {
  dailyRevenue: number;
  dailyCost: number;
  dailyProfit: number;
  monthlyRevenue: number;
  monthlyCost: number;
  monthlyProfit: number;
  yearlyRevenue: number;
  yearlyCost: number;
  yearlyProfit: number;
  roi: number; // percentage
}

// Capacity Inputs
export interface CapacityInputs {
  containerCount: number;
  minersPerContainer: number;
  powerPerMiner: number; // kW
  sitePowerCapacity: number; // kW
  hashratePerMiner: number; // TH/s
}

// Capacity Calculation Results
export interface CapacityResult {
  totalHashrate: number; // TH/s
  totalPowerDraw: number; // kW
  utilizationPercent: number;
  maxContainersPossible: number;
  remainingCapacity: number; // kW
}

// Site Dimensions
export interface SiteDimensions {
  width: number; // meters
  length: number; // meters
  height: number; // meters (optional, for 3D visualization)
}

// Container Configuration
export interface ContainerConfig {
  id: string;
  x: number; // position in meters
  y: number;
  z: number;
  rotation: number; // degrees
  minersPerContainer: number;
  powerPerMiner: number;
}

// Generator Configuration
export interface GeneratorConfig {
  id: string;
  x: number;
  y: number;
  z: number;
  rotation: number;
  capacity: number; // kW
}

// Layout Parameters
export interface LayoutParameters {
  rows: number;
  columns: number;
  spacing: number; // meters between containers
  containerWidth: number; // meters
  containerLength: number; // meters
  containerHeight: number; // meters
}

// Planner Inputs
export interface PlannerInputs {
  containerCount: number;
  generatorCount: number;
  siteDimensions: SiteDimensions;
  layoutParameters: LayoutParameters;
  containers: ContainerConfig[];
  generators: GeneratorConfig[];
}

// Power Profile
export interface PowerProfile {
  totalRequired: number; // kW
  totalGenerated: number; // kW
  utilization: number; // percentage
  deficit: number; // kW (if negative, surplus)
}

// Complete Mining Scenario
export interface MiningScenario {
  id?: string;
  name?: string;
  email?: string;
  calculatorData: CalculatorInputs;
  plannerData: PlannerInputs;
  createdAt?: Date;
  updatedAt?: Date;
}

// Scenario Metadata (for listing)
export interface ScenarioMetadata {
  id: string;
  name: string | null;
  email: string | null;
  createdAt: Date;
  updatedAt: Date;
}

