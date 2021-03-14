import { CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles, Card, } from '@material-ui/core'
import clsx from 'clsx'
import { ArrowUpward, ArrowDownward } from '@material-ui/icons'

import { v4 as uuidv4 } from 'uuid'
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { chartData } from './DashCartData'
am4core.useTheme(am4themes_animated)

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    height: '100%',
    display: 'grid',
    gap: theme.spacing(3),
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: 'max-content 1fr',
    gridTemplateAreas: `
      "card  card  card  card"
      "chart chart table table"
    `
  },
  cardArea: {
    gridArea: 'card'
  },
  chartArea: {
    gridArea: 'chart'
  },
  tableArea: {
    gridArea: 'table',
    padding: theme.spacing(1)
  },
  gridArea: {
    gap: theme.spacing(3),
    display: 'grid',
    height: '100%'
  },
  columnFlow: {
    gridAutoFlow: 'column'
  },
  rowFlow: {
    gridAutoFlow: 'row'
  },
  minFillRow: {
    gridTemplateRows: 'max-content 1fr'
  },
  minFillColumn: {
    gridTemplateColumns: 'max-content 1fr'
  },
  sameSizeElements: {
    gridAutoColumns: '1fr',
    gridAutoRows: '1fr'
  },
  flexArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bgWarn: {
    backgroundColor: '#e66767'
  },
  bgNeutral: {
    backgroundColor: '#b0b6b8'
  },
  chipLike: {
    color: 'white',
    borderRadius: 9999999
  },
  endContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  revenueTable: {
    height: 0,
    minHeight: '100%',
    overflowY: 'scroll'
  }
}))

type DashCardData = {
  label: string
  value: string
  date: Date,
  MoM: number
}

const hardCodedDashData: DashCardData[] = [
  { label: 'Revenue', value: '$9,000K', date: new Date(2020, 7, 1), MoM: 21.7 },
  { label: 'Cost of Goods', value: '$4,000K', date: new Date(2020, 7, 1), MoM: -13.1 },
  { label: 'Gross Margin', value: '$5,000K', date: new Date(2020, 7, 1), MoM: 11.4 },
  { label: 'Gross Margin %', value: '55.5%', date: new Date(2020, 7, 1), MoM: 14.7 }
]

const DashCard: React.FC<DashCardData> = ({ MoM, date, label, value }) => {
  const classes = useStyles()
  return (
    <Card elevation={4} key={label}>
      <CardContent className={clsx(classes.gridArea, classes.minFillColumn)}>
        <div>
          <Typography variant='body1' component='h4'>{label}</Typography>
          <Typography variant='h3' component='p'>{value}</Typography>
          <Typography>
            <time dateTime={date.toISOString()}>
              {date.toLocaleString(undefined, { year: 'numeric', month: 'short' })}
            </time>
          </Typography>
        </div>
        <div className={classes.endContent}>
          <div className={clsx(
            classes.flexArea,
            Math.sign(MoM) === -1 ? classes.bgWarn : classes.bgNeutral,
            classes.chipLike
          )}>
            <Typography>
              {Math.abs(MoM)}%
            </Typography>
            {Math.sign(MoM) === -1 ?
              <ArrowDownward aria-label='negative' height={24} /> :
              <ArrowUpward aria-label='positive' height={24} />
            }
          </div>
          <Typography className={classes.flexArea}>MoM</Typography>
        </div>
      </CardContent>
    </Card>
  )
}



const headerLabels = ['Invoice #', 'Customer', 'Invoice Date', 'Revenue', 'Cost of Goods', "Gross Margin"]
const rows = new Array(100).fill(null).map((ele, index) => ({
  id: index,
  invoice: 12345,
  customer: 'Customer 1',
  invoiceDate: new Date(2020, 9, 30),
  revenue: 6000,
  costOfGoods: 2000,
  grossMargin: 4000
}))

const RevenueTable: React.FC = () => {
  return (
    <TableContainer>
      <Typography variant='h5' component='h3'>Revenue Details</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {headerLabels.map((ele) => <TableCell key={ele}>{ele}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((ele) => (
            <TableRow key={ele.id}>
              <TableCell>{ele.invoice}</TableCell>
              <TableCell>{ele.customer}</TableCell>
              <TableCell>{ele.invoiceDate.toLocaleDateString(undefined)}</TableCell>
              <TableCell>{ele.revenue}</TableCell>
              <TableCell>{ele.costOfGoods}</TableCell>
              <TableCell>{ele.grossMargin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

type DashChartProps = {
  title: string
  data: any[]
}

const DashChart: React.FC<DashChartProps> = ({ title, data }) => {
  const [id] = useState(() => uuidv4())
  const classes = useStyles()
  const theme = useTheme()
  useEffect(() => {

    const chart = am4core.create(id, am4charts.XYChart)
    chart.data = data

    // title
    const chartTitle = chart.titles.create()
    chartTitle.text = "Revenue & Gross Margin";
    chartTitle.fontSize = 18;
    chartTitle.fill = am4core.color(theme.palette.text.primary);
    chartTitle.align = 'left';

    // legend
    /* Add legend */
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.contentAlign = "right";
    chart.legend.fontSize = 12;
    chart.legend.labels.template.fill = am4core.color(theme.palette.text.primary);
    chart.legend.marginBottom = 10;

    chart.legend.markers.template.width = 20
    chart.legend.markers.template.height = 20
    chart.legend.markers.template.strokeWidth = 0


    /* Create date axis */
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormats.setKey("month", "MMM yyyy");
    dateAxis.fontSize = 14;
    dateAxis.renderer.labels.template.fill = am4core.color(theme.palette.text.primary);
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.renderer.grid.template.strokeWidth = 0;
    dateAxis.cursorTooltipEnabled = false;


    /* Create value axes */
    const valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis1.min = 0;
    valueAxis1.fontSize = 14;
    valueAxis1.renderer.labels.template.fill = am4core.color(theme.palette.text.primary);
    valueAxis1.renderer.grid.template.stroke = am4core.color("#f5f5f5");
    valueAxis1.renderer.grid.template.strokeWidth = 2;
    valueAxis1.renderer.grid.template.strokeOpacity = .8;
    valueAxis1.renderer.baseGrid.stroke = am4core.color("#f5f5f5");
    valueAxis1.renderer.minGridDistance = 50;
    valueAxis1.numberFormatter = new am4core.NumberFormatter();
    valueAxis1.numberFormatter.numberFormat = "$#,###.#.a";
    valueAxis1.cursorTooltipEnabled = false;


    /* Create column series */
    const columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Revenue";
    columnSeries.dataFields.valueY = "revenue";
    columnSeries.dataFields.dateX = "month";
    columnSeries.yAxis = valueAxis1;
    columnSeries.fill = am4core.color("#b0b6b8");
    columnSeries.fillOpacity = .6;
    columnSeries.stroke = am4core.color('#FFF');
    columnSeries.columns.template.column.cornerRadiusTopLeft = 6;
    columnSeries.columns.template.column.cornerRadiusTopRight = 6;
    columnSeries.columns.template.propertyFields.fill = "#BDC3C7";
    columnSeries.tooltipText = "[#fff font-size: 14px]{name} \n[/] [#fff font-size: 12px]{dateX.formatDate('MMM yyyy')} \n[/]  [#fff font-size: 18px]{valueY.formatNumber('$#,###.#.a')}[/] [#fff]{additional}[/]";
    if (columnSeries.tooltip) {
      columnSeries.tooltip.getFillFromObject = false;
      columnSeries.tooltip.background.fill = am4core.color("#b0b6b8");
    }


    /* Create line series */
    const lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Gross Margin";
    lineSeries.dataFields.valueY = "gross margin";
    lineSeries.dataFields.dateX = "month";
    lineSeries.yAxis = valueAxis1;
    lineSeries.stroke = am4core.color(theme.palette.primary.main);
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.smoothing = 'monotoneX'
    lineSeries.tooltipText = "[#fff font-size: 14px]{name} \n[/] [#fff font-size: 12px]{dateX.formatDate('MMM yyyy')} \n[/]  [#fff font-size: 18px]{valueY.formatNumber('$#,###.#.a')}[/] [#fff]{additional}[/]";
    /* Changing tooltip background fill */
    if (lineSeries.tooltip) {
      lineSeries.tooltip.getFillFromObject = false;
      lineSeries.tooltip.background.fill = am4core.color(theme.palette.primary.main);
    }

    const bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color(theme.palette.primary.main);
    const circle = bullet.createChild(am4core.Circle);
    circle.radius = 5;
    circle.fill = am4core.color(theme.palette.primary.main);
    circle.strokeWidth = 2.5;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineY.strokeWidth = 0;


    /* Zoom out button */
    chart.zoomOutButton.background.fill = am4core.color(theme.palette.text.primary);
    const chartHover = chart.zoomOutButton.background.states.getKey("hover")
    if (chartHover) chartHover.properties.fill = am4core.color(theme.palette.primary.main);
    const chartDown = chart.zoomOutButton.background.states.getKey("down")
    if (chartDown) chartDown.properties.fill = am4core.color(theme.palette.primary.main);



    chart.logo.disabled = true;
    return () => {
      chart.dispose()
    }
  }, [theme, data, id])
  return <div id={id} className={classes.gridArea} />
}

function Dashboard() {
  const classes = useStyles()
  return (
    <div className={clsx(classes.gridArea, classes.minFillRow)}>
      <Typography variant='h3' component='h2' color='primary'>My Dashboard</Typography>
      <div className={classes.dashboardContainer}>
        <div className={clsx(classes.gridArea, classes.columnFlow, classes.cardArea, classes.sameSizeElements)}>
          {hardCodedDashData.map((ele, index) => <DashCard key={index} {...ele} />)}
        </div>
        <div className={clsx(classes.gridArea, classes.chartArea)}>
          <Card elevation={4}>
            <DashChart title='Revenue & Cost of Goods' data={chartData} />
          </Card>
          <Card elevation={4}>
            <DashChart title='Revenue & Cost of Goods' data={chartData} />
          </Card>
        </div>
        <Card elevation={4} className={clsx(classes.gridArea, classes.tableArea, classes.minFillRow, classes.revenueTable)}>
          <RevenueTable />
        </Card>
      </div>
    </div>
  )
}

export {
  Dashboard
}