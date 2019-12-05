require 'mechanize'
require 'pry'

class WetherScraping
  @@prec_no = 0
  @@block_no = 0
  @@year = 0
  @@month = 0
  @@day = 0
  @@url = ""
  @@page = ""
  @@head_tr = ""
  @@heads_ths = ""

  def initialize(prec_no,block_no,year,month,day)
    @@prec_no = prec_no
    @@block_no = block_no
    @@year = year
    @@month = month
    @@day = day
    @@url = "https://www.data.jma.go.jp/obd/stats/etrn/view/daily_s1.php?prec_no=#{@@prec_no}&block_no=#{@@block_no}&year=#{@@year}&month=#{@@month}&day=#{@@day}&view="
    agent = Mechanize.new
    @@page = agent.get(@@url)
    @@head_tr = @@page.search('//*[@id="tablefix1"]/tr[1]')
    @@heads_ths = @@head_tr.search('th')
  end
  
  # innner_text 未入力の場合は全coloum数、innner_textを入れればそこまでのcoloum数を返す
  def get_coloum(inner_text = "")
    colsum = 0
    @@heads_ths.each do |th|
      return colsum if inner_text != "" && th.inner_text() == inner_text
      colspan = th.get_attribute(:colspan).to_i
      colspan = 1 if colspan == 0
      colsum += colspan
    end
    return colsum
  end
  
  def get_row_length()
    table = @@page.search('//*[@id="tablefix1"]/tr')
    table.size
  end
  
  def get_table_values(colum_num, row_length, first_row)
    row = first_row
    values = []
    while row <= row_length
      tr = @@page.search("//*[@id=\"tablefix1\"]/tr[#{row}]")
      tds = tr.search('td')
      tr_values = []
      tds.each do |td|
        tr_values << td.inner_text() 
      end
      values << tr_values[colum_num] unless tr_values[colum_num].size == 0
      row += 1
    end
    return values
  end
  
end
