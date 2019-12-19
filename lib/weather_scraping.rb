require 'mechanize'
require "date"

class WetherScraping
  attr_reader :prec_no, :block_no, :date, :url

  # is_nomal = true ⇨ 平年値のページをスクレイピング false指定年月日のページをスクレイピング
  def initialize(prec_no,block_no,date,is_nomal = false)
    @prec_no = prec_no
    @block_no = block_no
    @date = date
    @is_nomal = is_nomal
    if @is_nomal
      @url = "https://www.data.jma.go.jp/obd/stats/etrn/view/nml_sfc_d.php?prec_no=#{@prec_no}&block_no=#{@block_no}&year=#{@date.year}&month=#{@date.month}&day=#{@date.day}&view="
    elsif !@is_nomal
      @url = "https://www.data.jma.go.jp/obd/stats/etrn/view/daily_s1.php?prec_no=#{@prec_no}&block_no=#{@block_no}&year=#{@date.year}&month=#{@date.month}&day=#{@date.day}&view="
    end
    agent = Mechanize.new
    @@page = agent.get(@url)
    @@head_tr = @@page.search('//*[@id="tablefix1"]/tr[1]')
    @@heads_ths = @@head_tr.search('th')
  end
  
  # innner_text 未入力の場合は全coloum数、innner_textを入れればそこまでのcoloum数を返す
  def get_coloum_index(inner_text = "")
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

  def start_row
    if @is_nomal
      row = 4
    else
      row = 5
    end
    return row
  end
  
  def get_coloum_texts(colum_num, row_length)
    row = start_row()
    texts = []
    while row <= row_length
      row_children_XMLs = @@page.search("//*[@id=\"tablefix1\"]/tr[#{row}]").children
      row_texts = []
      row_children_XMLs.each do |child|
        row_texts << child.inner_text()
      end
      texts << row_texts[colum_num] unless row_texts[colum_num].size == 0
      row += 1
    end
    return texts
  end

  def get_value(coloum_num)
    colvalues = get_coloum_texts(coloum_num, get_row_length())
    colvalues[@date.day - 1]
  end
  
end